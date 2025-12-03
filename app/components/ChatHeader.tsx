"use client";

import { Avatar, Stack, Typography, Box } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { UserButton } from "@clerk/nextjs";

export function ChatHeader() {
    return (
        <Stack spacing={1.5}>
            <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                        sx={{
                            bgcolor: "#2563eb",
                            width: 40,
                            height: 40,
                        }}
                    >
                        <AutoAwesomeIcon fontSize="small" />
                    </Avatar>

                    <Typography variant="h4" fontWeight={700}>
                        AI Project Advisor
                    </Typography>
                </Stack>

                <Box>
                    <UserButton 
                        appearance={{
                            elements: {
                                avatarBox: "w-10 h-10"
                            }
                        }}
                    />
                </Box>
            </Stack>

            <Typography variant="body1" color="text.secondary">
                Get tips, inspiration, and guidance to get started on your project.
            </Typography>
        </Stack>
    );
}
