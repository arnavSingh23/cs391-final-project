import { Avatar, Stack, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export function ChatHeader() {
    return (
        <Stack spacing={1.5}>
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

            <Typography variant="body1" color="text.secondary">
                Get tips, inspiration, and guidance to get started on your project.
            </Typography>
        </Stack>
    );
}
