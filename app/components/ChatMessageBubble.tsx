"use client";

// Credit: Arnav Singh
import { Avatar, Box, Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// role of the message either the user or the assistant
export type ChatRole = "user" | "assistant";

// shape of chat
export interface ChatMessage {
    id: number;
    role: ChatRole;
    content: string;
}

interface Props {
    message: ChatMessage;
}

export function ChatMessageBubble({ message }: Props) {
    // quick check flag to see if the message is from the user
    const isUser = message.role === "user";

    return (
        <Stack
            direction="row"
            spacing={1.5}
            // Align bubbles to the right for user and left for assistant
            justifyContent={isUser ? "flex-end" : "flex-start"}
            alignItems="flex-end"
        >
            {!isUser && (
                // show the assistant avatar on left when message is from assistant
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
                    // simple text for users
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                        {message.content}
                    </Typography>
                ) : (
                    // for assistants render markdown
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
                            {/* ReactMarkdown parses the assistant's content as Markdown.
                           remarkGfm enables GitHub like markdown
                           source: https://github.com/remarkjs/react-markdown*/}
                            {message.content}
                        </ReactMarkdown>
                    </Typography>
                )}
            </Box>

            {isUser && (
                // likewise show the user avatar when user sends a message
                <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                    <PersonIcon fontSize="small" />
                </Avatar>
            )}
        </Stack>
    );
}
