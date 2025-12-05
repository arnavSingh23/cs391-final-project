// Credit: Arnav Singh
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        // really basic validation in that prompt must exist and be a string
        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        // forward prompt to OpenRouter's chat completion API
        const apiRes = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    // api key is loaded from env
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-20b:free",
                    messages: [
                        {
                            role: "user",
                            // append style instructions so responses are plain text
                            content: prompt + " ensure that you do not use emojis, or markdown, just plain paragraphs in a clean and concise way",
                        },
                    ],
                }),
            }
        );

        // if OpenRouter returns a non 20x status log details and return 500
        if (!apiRes.ok) {
            const text = await apiRes.text();
            console.error("OpenRouter error:", apiRes.status, text);
            return NextResponse.json(
                { error: "OpenRouter request failed" },
                { status: 500 }
            );
        }

        // parse successful JSON response from OpenRouter.
        const data = await apiRes.json();

        const message =
            data.choices?.[0]?.message?.content ??
            "No response from model. Try another question.";

        // return the model's message back to the frontend as JSON.
        return NextResponse.json({ message });
    } catch (err) {
        // catch server side errors
        console.error("API /api/chat error:", err);
        return NextResponse.json(
            { error: "Unexpected server error" },
            { status: 500 }
        );
    }
}
