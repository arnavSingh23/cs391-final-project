"use client";

import { ReactNode } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        background: {
            default: "#f5f5f5",
        },
    },
    shape: {
        borderRadius: 16,
    },
});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
