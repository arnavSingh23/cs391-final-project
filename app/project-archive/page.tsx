"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Box, CircularProgress, Container, Stack } from "@mui/material";
import ProjectArchiveHeader from "../components/ProjectArchiveHeader";
import ProjectGrid from "../components/ProjectGrid";
import EmptyProjectState from "../components/EmptyProjectState";
import FloatingAddButton from "../components/FloatingAddButton";
import NewPostModal from "../components/NewPost";
import type { Project } from "../../types";


// How many projects to show per page (pagination)
// Source: https://react.dev/reference/react/useState#controlling-the-state-structure
const PAGE_SIZE = 10;
// Max length for project title 
const TITLE_MAX = 120;
// Max length for project description 
const DESCRIPTION_MAX = 1000;

// Main component for the project archive page
// I split up state for clarity and to avoid weird bugs with grouped state (see React docs: https://react.dev/learn/choosing-the-state-structure)
export default function ProjectArchivePage() {
    // List of projects loaded from the API
    const [projects, setProjects] = useState<Project[]>([]);
    // Modal state for adding a new project
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Loading state for initial fetch
    const [loadingInitial, setLoadingInitial] = useState(false);
    // Loading state for infinite scroll
    const [loadingMore, setLoadingMore] = useState(false);
    // Whether there are more projects to load (for infinite scroll)
    const [hasMore, setHasMore] = useState(true);
    // Current page for pagination
    const [page, setPage] = useState(0);
    // Loading state for submitting a new project
    const [submitting, setSubmitting] = useState(false);
    // Error state for API or validation
    const [error, setError] = useState<string | null>(null);
    // Ref for infinite scroll trigger
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    // Ref to ensure we only do the initial load once
    const initialLoadRef = useRef(false);

    // Helper to map raw API data to our Project type
    // This is just to keep the rest of the code clean and avoid bugs from missing fields
    // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const mapProjects = useCallback(
        (raw: any[]): Project[] =>
            raw.map((p: any) => ({
                id: p.id,
                title: p.title,
                description: p.description,
                repoUrl: p.repo_url ?? "",
                timestamp: p.timestamp ? new Date(p.timestamp) : new Date(),
            })),
        []
    );

    // Fetch projects from the API, paginated
    // Infinite scroll pattern: https://web.dev/patterns/web-vitals/infinite-scroll/
    // I use two loading states so the spinner UX is clear and doesn't flicker
    const fetchProjects = useCallback(
        async (pageToLoad = 0) => {
            const isFirstPage = pageToLoad === 0;
            // Don't double-load if already loading or submitting
            if ((isFirstPage && loadingInitial) || (!isFirstPage && loadingMore) || submitting) {
                return;
            }

            // Set loading state
            if (isFirstPage) {
                setLoadingInitial(true);
            } else {
                setLoadingMore(true);
            }

            setError(null);
            const offset = pageToLoad * PAGE_SIZE;

            try {
                // Fetch projects from our Next.js API route
                // Source: https://nextjs.org/docs/app/building-your-application/routing/api-routes
                const res = await fetch(`/api/project-archive?offset=${offset}&limit=${PAGE_SIZE}`);
                const json = await res.json();

                if (res.ok && Array.isArray(json.projects)) {
                    const mapped = mapProjects(json.projects);
                    setHasMore(mapped.length === PAGE_SIZE);
                    setPage(pageToLoad);

                    if (isFirstPage) {
                        setProjects(mapped);
                    } else {
                        // Avoid duplicates if API returns same project twice
                        setProjects((prev) => {
                            const existingIds = new Set(prev.map((p) => p.id));
                            const newOnes = mapped.filter((p) => !existingIds.has(p.id));
                            return [...prev, ...newOnes];
                        });
                    }
                } else {
                    setError(json.error || "Failed to load projects");
                    setHasMore(false);
                }
            } catch {
                setError("Failed to load projects");
            } finally {
                if (isFirstPage) {
                    setLoadingInitial(false);
                } else {
                    setLoadingMore(false);
                }
            }
        },
        [loadingInitial, loadingMore, mapProjects, submitting]
    );

    // Initial load: only run once
    // Source: https://react.dev/reference/react/useEffect
    useEffect(() => {
        if (initialLoadRef.current) return;
        initialLoadRef.current = true;
        fetchProjects(0);
    }, [fetchProjects]);

    // Infinite scroll: load more projects when the sentinel div is visible
    // Source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    useEffect(() => {
        if (!loadMoreRef.current) return;
        const target = loadMoreRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore && !loadingMore && !loadingInitial) {
                    fetchProjects(page + 1);
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(target);
        return () => observer.unobserve(target);
    }, [fetchProjects, hasMore, loadingInitial, loadingMore, page]);

    // Handle adding a new project via the modal
    // I do validation here so the user gets instant feedback
    // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length
    const handleAddProject = async (data: {
        title: string;
        description: string;
        repoUrl: string;
    }) => {
        if (data.title.length > TITLE_MAX) {
            setError(`Title must be ${TITLE_MAX} characters or less`);
            return;
        }
        if (data.description.length > DESCRIPTION_MAX) {
            setError(`Description must be ${DESCRIPTION_MAX} characters or less`);
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            // POST to our Next.js API route
            // Source: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            const res = await fetch("/api/project-archive", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const json = await res.json();

            if (res.ok && json.project) {
                // Add the new project to the top of the list
                const newProject: Project = {
                    id: json.project.id,
                    title: json.project.title,
                    description: json.project.description,
                    repoUrl: json.project.repo_url ?? "",
                    timestamp: new Date(json.project.timestamp),
                };
                setProjects((prev) => [newProject, ...prev]);
                setHasMore(true);
            } else {
                setError(json.error || "Failed to submit project");
            }
        } catch {
            setError("Failed to submit project");
        } finally {
            setSubmitting(false);
        }
    };

    // Open/close modal handlers
    // This is just classic React modal state
    // Source: https://mui.com/material-ui/react-modal/
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f5f5f5",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                py: 6,
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={4}>
                    <ProjectArchiveHeader onAddProject={handleOpenModal} />

                    {error && <Alert severity="error">{error}</Alert>}

                    {loadingInitial ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : projects.length > 0 ? (
                        <>
                            <ProjectGrid projects={projects} />
                            <Box ref={loadMoreRef} sx={{ height: 1 }} />
                            {loadingMore && (
                                <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                                    <CircularProgress size={24} />
                                </Box>
                            )}
                        </>
                    ) : (
                        <EmptyProjectState onAdd={handleOpenModal} />
                    )}
                </Stack>

                <FloatingAddButton onClick={handleOpenModal} />

                <NewPostModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleAddProject}
                />
            </Container>
        </Box>
    );
}
