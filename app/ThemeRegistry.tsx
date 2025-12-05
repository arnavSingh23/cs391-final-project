"use client";

// Credit: Arnav Singh
import { ReactNode } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// create custom MUI theme that will be applied globally
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

// this is a wrapper component that will provide the MUI theme to all its children
export default function ThemeRegistry({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
