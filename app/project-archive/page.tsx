"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Box, CircularProgress, Container, Stack } from "@mui/material";
import ProjectArchiveHeader from "../components/ProjectArchiveHeader";
import ProjectGrid from "../components/ProjectGrid";
import EmptyProjectState from "../components/EmptyProjectState";
import FloatingAddButton from "../components/FloatingAddButton";
import NewPostModal from "../components/NewPost";
import type { Project } from "../../types";


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
    const [loading, setLoading] = useState(false);
    // Loading state for submitting a new project
    const [submitting, setSubmitting] = useState(false);
    // Error state for API or validation
    const [error, setError] = useState<string | null>(null);

    // Helper to map raw API data to our Project type
    const mapProjects = (raw: any[]): Project[] =>
        raw.map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            repoUrl: p.repo_url ?? "",
            timestamp: p.timestamp ? new Date(p.timestamp) : new Date(),
        }));

    // Fetch all projects once on mount (no pagination)
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch("/api/project-archive")
            .then(res => res.json())
            .then(json => {
                if (Array.isArray(json.projects)) {
                    setProjects(mapProjects(json.projects));
                } else {
                    setError(json.error || "Failed to load projects");
                }
            })
            .catch(() => setError("Failed to load projects"))
            .finally(() => setLoading(false));
    }, []);



    // Handle adding a new project via the modal
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
                setProjects(prev => [{
                    ...json.project,
                    timestamp: new Date(json.project.timestamp),
                    repoUrl: json.project.repo_url ?? ""
                }, ...prev]);
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
                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : projects.length > 0 ? (
                        <ProjectGrid projects={projects} />
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
