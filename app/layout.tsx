import type { Metadata } from "next";
import { ReactNode } from "react";
import ThemeRegistry from "./ThemeRegistry";

export const metadata: Metadata = {
    title: "AI Project Advisor",
    description: "Chatbot UI hooked up to OpenRouter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ThemeRegistry>{children}</ThemeRegistry>
        </body>
        </html>
    );
}
