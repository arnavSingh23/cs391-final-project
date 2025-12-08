// Sign Up Page Component
// This page displays the Clerk authentication sign-up form
// The [[...sign-up]] folder structure allows Clerk to handle all sign-up routes dynamically

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        // Container div to center the sign-up form on the page
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh", 
            backgroundColor: "#f5f5f5" // Light gray background
        }}>
            {/* Clerk SignUp component with custom styling */}
            <SignUp
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

