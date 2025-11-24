"use client";

import Link from "next/link";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function LandingPage() {
    return (
            <Container maxWidth="md">
                <Stack spacing={4}>
                    <Stack direction="row" spacing={2}>
                        <Button
                            component={Link}
                            href="/chatbot"
                            variant="contained"
                            size="large"
                        >
                            Open AI Project Advisor
                        </Button>
                    </Stack>
                </Stack>
            </Container>
    );
}
