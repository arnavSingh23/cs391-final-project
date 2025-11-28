"use client";

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    onClick: () => void;
}

export default function FloatingAddButton({ onClick }: Props) {
    return (
        <Fab
            color="primary"
            aria-label="add project"
            onClick={onClick}
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                display: { xs: "flex", sm: "none" },
            }}
        >
            <AddIcon />
        </Fab>
    );
}
