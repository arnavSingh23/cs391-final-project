"use client";
import { Box, Container, Typography } from "@mui/material";
import type { User } from "../../types";
import ProfileHeader from "./ProfileHeader";
import { useUser } from "@clerk/nextjs";

interface ProfileProps {
    user: User;
    onUpdateUser: (u: User) => void;
}

export default function Profile({ user }: ProfileProps) {

    const { user: clerkUser } = useUser();
    if (!clerkUser) return <div>Loading...</div>

    //extract token claims from Clerk user
    const email = clerkUser.primaryEmailAddress?.emailAddress;
    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();

    const mergedUser: User = {
        ...user,
        name,
        email,
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <ProfileHeader user={mergedUser} />

                <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
                        <Typography variant="body2" color="text.secondary" fontWeight="bold">
                            User ID:
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-all" }}>
                            {clerkUser.id}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
                        <Typography variant="body2" color="text.secondary" fontWeight="bold">
                            Last sign-in:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {clerkUser.lastSignInAt?.toLocaleString()}
                        </Typography>
                    </Box>
                </Box>


            </Container>
        </Box>
    );
}
