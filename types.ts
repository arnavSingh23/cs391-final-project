export interface User {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    joinedDate: Date;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    timestamp: Date;
    repoUrl: string;
}
