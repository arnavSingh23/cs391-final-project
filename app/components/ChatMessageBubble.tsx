"use client";

import { Avatar, Box, Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
    id: number;
    role: ChatRole;
    content: string;
}

interface Props {
    message: ChatMessage;
}

export function ChatMessageBubble({ message }: Props) {
    const isUser = message.role === "user";

    return (
        <Stack
            direction="row"
            spacing={1.5}
            justifyContent={isUser ? "flex-end" : "flex-start"}
            alignItems="flex-end"
        >
            {!isUser && (
                <Avatar sx={{ width: 32, height: 32 }}>
                    <SmartToyIcon fontSize="small" />
                </Avatar>
            )}

            <Box
                sx={{
                    maxWidth: "70%",
                    px: 2,
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: isUser ? "primary.main" : "grey.200",
                    color: isUser ? "primary.contrastText" : "text.primary",
                }}
            >
                {isUser ? (
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                        {message.content}
                    </Typography>
                ) : (
                    <Typography
                        variant="body2"
                        component="div"
                        sx={{
                            whiteSpace: "pre-wrap",
                            "& h1, & h2, & h3": {
                                fontSize: 14,
                                fontWeight: 600,
                                mb: 0.5,
                            },
                            "& ul, & ol": {
                                pl: 2.5,
                                mb: 0.5,
                            },
                            "& li": {
                                mb: 0.25,
                            },
                            "& p": {
                                mb: 0.75,
                            },
                        }}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                        </ReactMarkdown>
                    </Typography>
                )}
            </Box>

            {isUser && (
                <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                    <PersonIcon fontSize="small" />
                </Avatar>
            )}
        </Stack>
    );
}
