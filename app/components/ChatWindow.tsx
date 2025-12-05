"use client";

// Credit: Arnav Singh
import { useEffect, useRef } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import { ChatMessage, ChatMessageBubble } from "./ChatMessageBubble";

interface Props {
    messages: ChatMessage[];
    loading: boolean;
}

export function ChatWindow({ messages, loading }: Props) {
    // ref to the scrollable container, used to auto-scroll to the bottom when new messages arrive
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            // scrollTop at scrollHeight means "jump to the bottom" of the scrollable area
            el.scrollTop = el.scrollHeight;
        }
    }, [messages, loading]);

    return (
        <Box
            ref={containerRef}
            sx={{
                maxHeight: 360, // limit visible height, content below will scroll
                overflowY: "auto", // enable vertical scrolling
                pr: 1,
                // hide scrollbar for a cleaner ui across browsers
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
