"use client";
//Maddie
import { Box, Avatar, Stack, Typography } from "@mui/material";
import type { User } from "../../types";

interface ProfileHeaderProps {
    user: User;
}

//Displays user avatar, name, email at top of the Profile screen
//presentational component
export default function ProfileHeader({ user }: ProfileHeaderProps) {

    return (
        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
            {/* Avatar. Fall back to first letter of name if no image provided */}
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

            </Stack>
        </Box>
    );
}
