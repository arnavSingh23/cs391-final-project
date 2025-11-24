import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const apiRes = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-20b:free",
                    messages: [
                        {
                            role: "user",
                            content: prompt + " ensure that you do not use emojis, or markdown, just plain paragraphs in a clean and concise way",
                        },
                    ],
                }),
            }
        );

        if (!apiRes.ok) {
            const text = await apiRes.text();
            console.error("OpenRouter error:", apiRes.status, text);
            return NextResponse.json(
                { error: "OpenRouter request failed" },
                { status: 500 }
            );
        }

        const data = await apiRes.json();

        const message =
            data.choices?.[0]?.message?.content ??
            "No response from model. Try another question.";

        return NextResponse.json({ message });
    } catch (err) {
        console.error("API /api/chat error:", err);
        return NextResponse.json(
            { error: "Unexpected server error" },
            { status: 500 }
        );
    }
}
