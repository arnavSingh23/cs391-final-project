"use client";

import { Box } from "@mui/material";
import ProjectCard from "./ProjectCard";
import type { Project } from "../../types";

interface Props {
    projects: Project[];
}

export default function ProjectGrid({ projects }: Props) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                },
                gap: 3,
            }}
        >
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </Box>
    );
}
