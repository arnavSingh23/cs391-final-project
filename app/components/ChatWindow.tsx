"use client";

import { useEffect, useRef } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import { ChatMessage, ChatMessageBubble } from "./ChatMessageBubble";

interface Props {
    messages: ChatMessage[];
    loading: boolean;
}

export function ChatWindow({ messages, loading }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages, loading]);

    return (
        <Box
            ref={containerRef}
            sx={{
                maxHeight: 360,
                overflowY: "auto",
                pr: 1,

                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            }}
        >
            <Stack spacing={2}>
                {messages.map((m) => (
                    <ChatMessageBubble key={m.id} message={m} />
                ))}

                {loading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            pl: 5,
                            pt: 1,
                        }}
                    >
                        <CircularProgress size={20} />
                    </Box>
                )}
            </Stack>
        </Box>
    );
}
