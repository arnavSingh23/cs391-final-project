"use client";

import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import ProjectArchiveHeader from "../components/ProjectArchiveHeader";
import ProjectGrid from "../components/ProjectGrid";
import EmptyProjectState from "../components/EmptyProjectState";
import FloatingAddButton from "../components/FloatingAddButton";
import NewPostModal from "../components/NewPost";
import type { Project } from "../../types";

// Mock data replace with functionality idk what the chatbot will be but ig 
const initialProjects: Project[] = [
    {
        id: "1",
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.",
        timestamp: new Date("2024-10-15"),
        repoUrl: "https://github.com/username/ecommerce-platform",
    },
    {
        id: "2",
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, built using Next.js, Socket.io, and MongoDB. Includes team collaboration features and project tracking.",
        timestamp: new Date("2024-09-22"),
        repoUrl: "https://github.com/username/task-manager",
    },
    {
        id: "3",
        title: "Weather Dashboard",
        description: "Interactive weather dashboard with beautiful visualizations and forecasts. Built with React, TypeScript, and integrates with OpenWeatherMap API for real-time data.",
        timestamp: new Date("2024-08-10"),
        repoUrl: "https://github.com/username/weather-dashboard",
    },
    {
        id: "4",
        title: "Social Media Analytics",
        description: "Analytics platform for social media metrics with data visualization and reporting features. Uses Python, Django, and Chart.js for comprehensive insights.",
        timestamp: new Date("2024-07-05"),
        repoUrl: "https://github.com/username/social-analytics",
    },
];

export default function ProjectArchivePage() {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddProject = (data: {
        title: string;
        description: string;
        repoUrl: string;
    }) => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: data.title,
            description: data.description,
            timestamp: new Date(),
            repoUrl: data.repoUrl,
        };

        setProjects((prev) => [newProject, ...prev]);
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Sortd projects by timeeee
    const sortedProjects = [...projects].sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );

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

                    {projects.length > 0 ? (
                        <ProjectGrid projects={sortedProjects} />
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
