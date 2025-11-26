"use client";

import {
    Dialog, DialogTitle,
    DialogContent,
    IconButton,
    Stack,
    Typography,
    TextField,
    Button,
    Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit?: (data: {
        title: string;
        description: string;
        repoUrl: string;
    }) => void;
}

export default function NewPostModal({ open, onClose, onSubmit }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [repoUrl, setRepoUrl] = useState("");

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit({ title, description, repoUrl });
        }
        setTitle("");
        setDescription("");
        setRepoUrl("");
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 1,
                },
            }}
        >
            {/* HEADER */}
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
                    Share Your Project
                </Typography>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* SUBHEADER */}
            <DialogContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Tell the community about what you're building. Be descriptive
                    and inspiring!
                </Typography>

                <Stack spacing={3}>
                    {/* TITLE */}
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, mb: 1 }}
                        >
                            Project Title *
                        </Typography>
                        <TextField
                            placeholder="Give your project a catchy name!"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Box>

                    {/* DESCRIPTION */}
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, mb: 1 }}
                        >
                            Project Description *
                        </Typography>
                        <TextField
                            placeholder="Tell us about your project, what inspired you, what tech stack you used, etc…."
                            fullWidth
                            multiline
                            minRows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Box>

                    {/* REPO URL */}
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, mb: 1 }}
                        >
                            Project Repository
                        </Typography>
                        <TextField
                            placeholder="Include the link to your GitHub repository. Optional, but encouraged!"
                            fullWidth
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                        />
                    </Box>

                    {/* BUTTONS */}
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{ mt: 2 }}
                    >
                        <Button onClick={onClose}>Cancel</Button>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#4F46E5",
                                textTransform: "none",
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                            }}
                            onClick={handleSubmit}
                        >
                            Make Post
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
