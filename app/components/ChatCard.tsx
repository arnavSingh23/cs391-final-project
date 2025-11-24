import { Box, Divider } from "@mui/material";
import { ChatWindow } from "./ChatWindow";
import { ChatInput } from "./ChatInput";
import type { ChatMessage } from "./ChatMessageBubble";

interface Props {
    messages: ChatMessage[];
    loading: boolean;
    input: string;
    onInputChange: (value: string) => void;
    onSend: () => void;
}

export function ChatCard({
                             messages,
                             loading,
                             input,
                             onInputChange,
                             onSend,
                         }: Props) {
    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                borderRadius: 4,
                boxShadow: 1,
                px: 4,
                pt: 4,
                pb: 3,
                minHeight: 480,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ flexGrow: 1, mb: 2, overflow: "hidden" }}>
                <ChatWindow messages={messages} loading={loading} />
            </Box>

            <Divider sx={{ mx: -4, mb: 2 }} />

            <ChatInput
                value={input}
                onChange={onInputChange}
                onSend={onSend}
                disabled={loading}
            />
        </Box>
    );
}
