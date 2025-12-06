"use client";
// kwabena
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import type { Project } from "../../types";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Box>
                        <Typography variant="h5" sx={{ wordBreak: "break-word" }}>
                            {project.title}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <CalendarMonthIcon sx={{ fontSize: 12 }} />
                            <Typography variant="body2" color="text.secondary">
                                {project.timestamp.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </Typography>
                        </Box>
                    </Box>

                    {project.repoUrl && (
                        <Chip
                            label="View Repository"
                            size="small"
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                                window.open(
                                    project.repoUrl.startsWith("http") ? project.repoUrl : `https://${project.repoUrl}`,
                                    "_blank"
                                )
                            }
                        />
                    )}
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ wordBreak: "break-word" }}>
                    {project.description}
                </Typography>
            </CardContent>
        </Card>
    );
}
