"use client";

// Credit: Arnav Singh
import { useState } from "react";
import { Stack, Chip } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";

// parent passes a callback to recieve the selected prompt text
interface Props {
    onPromptSelect: (prompt: string) => void;
}

// keys used to track which chip is CURRENTLY active
type ChipKey = "inspo" | "stack" | "encourage";

export function SuggestionChips({ onPromptSelect }: Props) {
    const [activeKey, setActiveKey] = useState<ChipKey | null>(null);

    // when a chip is clicked it will be marked as active and will send prompt string to parent
    const handleClick = (key: ChipKey, prompt: string) => {
        setActiveKey(key);
        onPromptSelect(prompt);
    };

    return (
        // stack is from mui to arrange children horizontally
        <Stack direction="row" spacing={1.5}>
            <Chip
                icon={<LightbulbOutlinedIcon />}
                label="Project Inspo"
                variant={activeKey === "inspo" ? "filled" : "outlined"}
                color={activeKey === "inspo" ? "primary" : "default"}
                onClick={() =>
                    handleClick(
                        "inspo",
                        "Give me three concrete project ideas based on modern web or AI tools that a student could build in a few weeks."
                    )
                }
                sx={{
                    borderRadius: 999,
                    px: 1.5,
                }}
            />

            <Chip
                icon={<ConstructionOutlinedIcon />}
                label="Tech Stack Advice"
                variant={activeKey === "stack" ? "filled" : "outlined"}
                color={activeKey === "stack" ? "primary" : "default"}
                onClick={() =>
                    handleClick(
                        "stack",
                        "Help me choose a tech stack for a new side project. Ask me questions about my goals and experience, then recommend a stack."
                    )
                }
                sx={{
                    borderRadius: 999,
                    px: 1.5,
                }}
            />

            <Chip
                icon={<RocketLaunchOutlinedIcon />}
                label="Encouraging Message"
                variant={activeKey === "encourage" ? "filled" : "outlined"}
                color={activeKey === "encourage" ? "primary" : "default"}
                onClick={() =>
                    handleClick(
                        "encourage",
                        "Give me a short, specific, and encouraging message about staying consistent with my projects and learning."
                    )
                }
                sx={{
                    borderRadius: 999,
                    px: 1.5,
                }}
            />
        </Stack>
    );
}
