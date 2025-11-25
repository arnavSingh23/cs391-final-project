"use client";
import { Box, Container, Typography } from "@mui/material";
import type { User, Project } from "../../types";
import ProfileHeader from "./ProfileHeader";
import ProjectCard from "./ProjectCard";

interface ProfileProps {
    user: User;
    onUpdateUser: (u: User) => void;
    userProjects: Project[];
}

export default function Profile({ user, onUpdateUser, userProjects }: ProfileProps) {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <ProfileHeader user={user} onUpdateUser={onUpdateUser} />


                {/* Projects */}
                <Box>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Your Projects
                    </Typography>

                    {userProjects.length ? (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {userProjects.map((p) => (
                                <ProjectCard key={p.id} project={p} />
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: "center" }}>
                            <Typography color="text.secondary" sx={{ mb: 2 }}>
                                You haven't posted any projects yet.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
}
