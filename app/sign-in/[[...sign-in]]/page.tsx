// Sign In Page Component
// This page displays the Clerk authentication sign-in form
// The [[...sign-in]] folder structure allows Clerk to handle all sign-in routes dynamically

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        // Container div to center the sign-in form on the page
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh", 
            backgroundColor: "#f5f5f5" 
        }}>
            {/* Clerk SignIn component with custom styling */}
            <SignIn
                appearance={{
                    elements: {
                        rootBox: "mx-auto", 
                        card: "shadow-lg" 
                    }
                }}
            />
        </div>
    );
}

