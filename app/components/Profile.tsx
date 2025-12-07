"use client";
//Maddie
import { Box, Container, Typography, Divider } from "@mui/material";
import type { User, Project } from "../../types";
import ProfileHeader from "./ProfileHeader";
import ProjectGrid from "./ProjectGrid"; // renders projects as cards, consistent w project archive

interface ProfileProps {
    user: User;                         //currently authenticated user. blindly renders, depending on what is passed in when it's in use
    projects: Project[];                // projects belonging to this user
    onUpdateUser: (u: User) => void;    // callback to update user info
}

// main profile page component
// shows user info  + all their projects 
export default function Profile({ user, projects }: ProfileProps) {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <Container maxWidth="md" sx={{ py: 4 }}>
                {/* TOP SECTION: avatar, name, email*/}
                <ProfileHeader user={user} />

                {/* USER ID */}
                <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
                        <Typography variant="body2" fontWeight="bold" color="text.secondary">
                            User ID:
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-all" }}>
                            {user.id}
                        </Typography>
                    </Box>
                </Box>

                {/* PROJECT SECTION */}
                <Divider sx={{ my: 4 }} />

                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    Your Projects
                </Typography>

                {projects.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        You haven't created any projects yet.
                    </Typography>
                ) : (
                    <ProjectGrid projects={projects} />
                )}
            </Container>
        </Box>
    );
}
