"use client";
//Maddie
import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import type { User, Project } from "../../types";
import { useUser } from "@clerk/nextjs";


/**
 * PROFILE PAGE 
 * responsible for:
 * - fetching current Clerk user;
 * - building User object for profile UI
 * - fetching user's project from profile API
 * - passing data to Profile component
 * */

export default function ProfilePage() {

    //useState: set user to the Clerk token value
    const { user: clerkUser, isLoaded } = useUser();
    const [user, setUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);


    //useEffect hook while Clerk finishes loading
    useEffect(() => {
        if (!isLoaded || !clerkUser) return;

        //build user object for profile UI
        const u: User = {
            id: clerkUser.id,
            name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
            email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
            avatar: clerkUser.imageUrl,
            joinedDate: clerkUser.createdAt ? new Date(clerkUser.createdAt) : new Date(),

        }

        //fetch projects ffor the logged-in user
        const fetchProjects = async () => {
            try {
                const res = await fetch(`/api/profile?user_id=${clerkUser.id}`);
                const data = await res.json();

                //convert raw data from API into project type
                const projects: Project[] = (data.projects || []).map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    repoUrl: p.repo_url ?? "",
                    timestamp: p.timestamp ? new Date(p.timestamp) : new Date(),
                    user_id: p.user_id,
                }));


                setProjects(projects);
            } catch (err) {
                console.error("Error fetching this user's projects:", err)
            } finally {
                setLoading(false)
            }
        };

        fetchProjects();
        setUser(u);

    }, [isLoaded, clerkUser] //dependency list: re-run effect when these vars change
    );

    if (!isLoaded) return <div>Loading...</div>
    if (!clerkUser) return <div>No user found.</div>;
    if (!user) return <div>Loading User...</div>

    return <Profile user={user} projects={projects} onUpdateUser={setUser} />;
}
