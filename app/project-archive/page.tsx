"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Box, CircularProgress, Container, Stack } from "@mui/material";
import ProjectArchiveHeader from "../components/ProjectArchiveHeader";
import ProjectGrid from "../components/ProjectGrid";
import EmptyProjectState from "../components/EmptyProjectState";
import FloatingAddButton from "../components/FloatingAddButton";
import NewPostModal from "../components/NewPost";
import type { Project } from "../../types";

const PAGE_SIZE = 10;
const TITLE_MAX = 120;
const DESCRIPTION_MAX = 1000;

export default function ProjectArchivePage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const initialLoadRef = useRef(false);

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

    const fetchProjects = useCallback(
        async (pageToLoad = 0) => {
            const isFirstPage = pageToLoad === 0;
            if ((isFirstPage && loadingInitial) || (!isFirstPage && loadingMore) || submitting) {
                return;
            }

            if (isFirstPage) {
                setLoadingInitial(true);
            } else {
                setLoadingMore(true);
            }

            setError(null);
            const offset = pageToLoad * PAGE_SIZE;

            try {
                const res = await fetch(`/api/project-archive?offset=${offset}&limit=${PAGE_SIZE}`);
                const json = await res.json();

                if (res.ok && Array.isArray(json.projects)) {
                    const mapped = mapProjects(json.projects);
                    setHasMore(mapped.length === PAGE_SIZE);
                    setPage(pageToLoad);

                    if (isFirstPage) {
                        setProjects(mapped);
                    } else {
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

    useEffect(() => {
        if (initialLoadRef.current) return;
        initialLoadRef.current = true;
        fetchProjects(0);
    }, [fetchProjects]);

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
            const res = await fetch("/api/project-archive", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const json = await res.json();

            if (res.ok && json.project) {
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
