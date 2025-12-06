// Credit: Arnav Singh
import { ChangeEvent, KeyboardEvent } from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

// props for actual chat input
interface Props {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, disabled }: Props) {
    // update the input value when the user types
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    // allow sending with enter (no shift) and prevent newline insertion
    // source: https://stackoverflow.com/questions/18779322/disable-new-line-in-textarea-when-pressed-enter
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!disabled && value.trim()) {
                onSend();
            }
        }
    };
// regular mui stuff with sx custom styling
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: "#f3f3f3",
                    borderRadius: 999,
                    px: 2,
                    py: 1,
                }}
            >
                <InputBase
                    fullWidth
                    placeholder="Ask me anything about your project..."
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    sx={{ fontSize: 14 }}
                />
            </Box>

            <IconButton
                onClick={onSend}
                disabled={disabled || !value.trim()}
                sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": { bgcolor: "primary.dark" },
                    "&:disabled": { bgcolor: "grey.300", color: "grey.500" },
                }}
            >
                <SendRoundedIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}
