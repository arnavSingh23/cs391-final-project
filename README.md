# AI Project Advisor

A Next.js application with AI-powered project advice, featuring authentication via Clerk.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Clerk Authentication

1. Create an account at [Clerk](https://clerk.com) if you don't have one
2. Create a new application in the Clerk dashboard
3. Enable Google and GitHub as OAuth providers:
   - Go to **User & Authentication** → **Social Connections**
   - Enable **Google** and **GitHub**
   - Configure the OAuth apps in Google/GitHub and add the callback URLs provided by Clerk
4. Copy your Clerk keys from the dashboard
5. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Authentication**: Sign up and sign in with Google or GitHub via Clerk
- **Protected Routes**: All routes except landing, sign-in, and sign-up pages require authentication
- **User Profile**: Access user profile and sign out via the user button in the chat header

## Project Structure

- `/app/sign-in` - Sign in page with Google/GitHub options
- `/app/sign-up` - Sign up page with Google/GitHub options
- `/app/chatbot` - Protected chatbot interface
- `/middleware.ts` - Authentication middleware protecting routes

## To do 

## Component level design + overarching choices and functionality 

## blockers, possible extensions etc 