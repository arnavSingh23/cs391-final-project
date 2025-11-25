"use client";
import React, { useState } from "react";
import Profile from "../components/Profile";
import type { User, Project } from "../../types";

const mockUser: User = {
    id: "1",
    name: "Maddie",
    email: "maddie@example.com",
    avatar: "",
    joinedDate: new Date("2024-02-01"),
    bio: "Designer • Developer • Coffee enjoyer ☕",
};

const mockProjects: Project[] = [
    {
        id: "a",
        title: "Personal Portfolio",
        description: "A clean portfolio built with Next.js & Material UI.",
        repoUrl: "github.com/maddie/portfolio",
        timestamp: new Date(),
    },
    {
        id: "b",
        title: "Recipe Generator",
        description: "AI-powered recipe generator trained on my own meals.",
        repoUrl: "wikipedia.org",
        timestamp: new Date(),
    },
];

export default function ProfilePage() {
    const [user, setUser] = useState<User>(mockUser);
    const [userProjects] = useState<Project[]>(mockProjects);

    return <Profile user={user} onUpdateUser={setUser} userProjects={userProjects} />;
}
