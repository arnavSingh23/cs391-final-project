"use client";

import { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import {ChatMessage} from "@/app/components/ChatMessageBubble";
import {ChatHeader} from "@/app/components/ChatHeader";
import {SuggestionChips} from "@/app/components/SuggestionChips";
import {ChatCard} from "@/app/components/ChatCard";


export default function ChatbotPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            role: "assistant",
            content:
                "Hi! I'm your AI project advisor. I can help you brainstorm ideas, overcome technical challenges, find inspiration, or provide feedback on your projects. What would you like to talk about?",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    async function sendPrompt(promptText: string) {
        const text = promptText.trim();
        if (!text || loading) return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            role: "user",
            content: text,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: text }),
            });

            const data = await res.json();

            const assistantMessage: ChatMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content:
                    data.message ??
                    "I had trouble generating a response. Try asking in a different way.",
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch {
            const assistantMessage: ChatMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content:
                    "Something went wrong talking to the model. Please try again in a moment.",
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } finally {
            setLoading(false);
        }
    }

    function handleSendFromInput() {
        sendPrompt(input);
    }

    function handleSuggestionClick(prompt: string) {
        sendPrompt(prompt);
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f5f5f5",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                py: 6,
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <ChatHeader />

                    <ChatCard
                        messages={messages}
                        loading={loading}
                        input={input}
                        onInputChange={setInput}
                        onSend={handleSendFromInput}
                    />

                    <SuggestionChips onPromptSelect={handleSuggestionClick} />
                </Stack>
            </Container>
        </Box>
    );
}
