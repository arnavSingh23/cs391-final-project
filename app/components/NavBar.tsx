"use client";

// Navigation Bar Component
// This component provides a dyanamic navigation bar that appears at the top of the page
// for authenticated users, allowing them to navigate between different sections of the app

import { useUser, useClerk } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Typography,
    Container,
} from "@mui/material";

export default function NavBar() {
    // Get authentication state and sign out function from Clerk
    const { isSignedIn } = useUser();
    const { signOut } = useClerk();

    // Get current pathname and router for navigation
    const pathname = usePathname();
    const router = useRouter();

    // Only show navbar if user is signed in
    // If not signed in, return nothing 
    if (!isSignedIn) {
        return null;
    }

    // Define navigation items with their labels and paths
    const navItems = [
        { label: "Home", path: "/" },
        { label: "Chatbot", path: "/chatbot" },
        { label: "Project Archive", path: "/project-archive" },
        { label: "Profile", path: "/profile" },
    ];

    // Helper function to determine if a navigation item is currently active
    // Special case for home route ("/") - only active when exactly on home page
    // For other routes, check if current pathname starts with the route path
    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(path);
    };

    return (
        // navigation Bar that stays at the top when scrolling
        <AppBar
            position="sticky"
            sx={{
                bgcolor: "white",
                color: "text.primary",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        px: { xs: 1, sm: 2 },
                    }}
                >
                    {/* Left side: App title */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 700,
                                color: "primary.main",
                                mr: 3,
                            }}
                        >
                            AI Project Advisor
                        </Typography>
                    </Box>

                    {/* Navigation buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 3,
                            alignItems: "center",
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        {/* Map through nav items and render each as a button */}
                        {navItems.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Button
                                    key={item.path}
                                    onClick={() => router.push(item.path)}
                                    variant="outlined"
                                    sx={{
                                        // Dynamic styling based on active state
                                        color: active ? "primary.main" : "text.secondary",
                                        fontWeight: active ? 600 : 400,
                                        textTransform: "none",
                                        borderColor: active ? "primary.main" : "divider",
                                        "&:hover": {
                                            bgcolor: "action.hover",
                                            borderColor: active ? "primary.main" : "text.secondary",
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                    </Box>

                    {/* Sign out button */}
                    <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => signOut()} // Call Clerk's signOut function
                            sx={{
                                textTransform: "none",
                                borderColor: "text.secondary",
                                color: "text.secondary",
                                "&:hover": {
                                    borderColor: "error.main",
                                    color: "error.main",
                                },
                            }}
                        >

                            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                                Sign Out
                            </Box>
                            <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                                Out
                            </Box>
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

