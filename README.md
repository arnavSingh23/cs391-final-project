# AI Project Advisor

A Next.js application with AI-powered project advice and project sharing capability, featuring authentication via Clerk, and supporting Google OAuth.

## Setup

### 1. Clone Repository and Install Dependencies

```bash
npm install
```


### 2. Configure authentication via Clerk

- Create a Clerk account and new application
- Enable Google OAuth provider
- Copy Clerk and Supabase keys
```
OPENROUTER_API_KEY=<api-key>
SUPABASE_URL=<supabase-url>
SUPABASE_ANON_KEY=<supabase-anon-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk-key>
CLERK_SECRET_KEY=<clerk-secret-key>
```


Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Authentication**: Sign up and sign in with Google via Clerk
- **Protected Routes**: All routes except landing, sign-in, and sign-up pages require authentication
- **User Profile**: Access user profile, user's projects, and sign out via the "profile" tab in the chat header
- **AI-Assisted Project Advice**: A chatbot interface intended for AI-driven advice to get started on a project.
- **Project Database**: An archive view of projects shared by you and others on the platform. Users can post their projects to this page and see others' posts here.

## Project Structure

- `/app` Next.js app code: pages, auth, protected routes
- `/lib` Shared utility code, including database routing.
- `midddleware.ts` Enforces auth on protected routes.
- `types.ts` Type definitions used across the app.
- `package.json`, `tsconfig.json` Project configuration and dependencies

## Component level design + overarching choices and functionality 

## blockers, possible extensions etc 
