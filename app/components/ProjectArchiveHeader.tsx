"use client";

import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    onAddProject: () => void;
}

export default function ProjectArchiveHeader({ onAddProject }: Props) {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Box>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                    }}
                >
                    Project Archive
                </Typography>
                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    A collection of past projects and experiments
                </Typography>
            </Box>

            {}
            <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={onAddProject}
            >
                Add New Project
            </Button>
        </Box>
    );
}
