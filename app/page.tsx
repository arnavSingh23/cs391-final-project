"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function LandingPage() {
    const { isSignedIn, user } = useUser();

    return (
        <Container maxWidth="md">
            <Stack spacing={4} sx={{ py: 8 }}>
                <Typography variant="h3" component="h1" align="center" gutterBottom>
                    AI Project Advisor
                </Typography>


                {isSignedIn ? (
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="body1" color="text.secondary">
                            Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
                        </Typography>
                        <Button
                            component={Link}
                            href="/chatbot"
                            variant="contained"
                            size="large"
                            sx={{ minWidth: 200 }}
                        >
                            Open AI Project Advisor
                        </Button>
                    </Stack>
                ) : (
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="body1" color="text.secondary">
                            Sign in to get started
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Button
                                component={Link}
                                href="/sign-in"
                                variant="contained"
                                size="large"
                            >
                                Sign In
                            </Button>
                            <Button
                                component={Link}
                                href="/sign-up"
                                variant="outlined"
                                size="large"
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </Container>
    );
}
