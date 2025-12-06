import type { Metadata } from "next";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeRegistry from "./ThemeRegistry";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
    title: "AI Project Advisor",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <ThemeRegistry>
                        <NavBar />
                        {children}
                    </ThemeRegistry>
                </body>
            </html>
        </ClerkProvider>
    );
}
