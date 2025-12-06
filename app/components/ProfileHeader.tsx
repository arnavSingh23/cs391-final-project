"use client";

import { Box, Avatar, Stack, Typography } from "@mui/material";
import type { User } from "../../types";

interface ProfileHeaderProps {
    user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {

    return (
        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
            {/* Avatar */}
            <Avatar
                src={user.avatar}
                sx={{ width: 96, height: 96, borderRadius: "50%" }}
            >
                {user.name?.charAt(0)}
            </Avatar>

            {/* Right column: name, email, bio */}
            <Stack spacing={1.2} sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight={600}>
                    {user.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {user.email}
                </Typography>

                {/* Bio */}
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
                    {user.bio || "No bio available."}
                </Typography>
            </Stack>
        </Box>
    );
}
