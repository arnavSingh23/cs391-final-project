"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Typography,
    Container,
} from "@mui/material";
import { SignOutButton } from "@clerk/nextjs";

export default function NavBar() {
    const { isSignedIn } = useUser();
    const pathname = usePathname();
    const router = useRouter();

    if (!isSignedIn) {
        return null;
    }

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Chatbot", path: "/chatbot" },
        { label: "Project Archive", path: "/project-archive" },
        { label: "Profile", path: "/profile" },
    ];

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(path);
    };

    return (
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
                            ProjectPartner
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        {navItems.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Button
                                    key={item.path}
                                    onClick={() => router.push(item.path)}
                                    sx={{
                                        color: active ? "primary.main" : "text.secondary",
                                        fontWeight: active ? 600 : 400,
                                        textTransform: "none",
                                        "&:hover": {
                                            bgcolor: "action.hover",
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                        <SignOutButton>
                            <Button
                                variant="outlined"
                                size="small"
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
                        </SignOutButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

