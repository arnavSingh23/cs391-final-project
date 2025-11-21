"use client";

import {FormEvent, useState} from "react";

export default function HomePage() {
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setAnswer(null);

        try {
            const res = await fetch("/api/chat", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({prompt}),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Request failed");
            }

            const data = await res.json();
            setAnswer(data.message);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (<main className="min-h-screen flex flex-col items-center justify-start p-8 gap-6">
            <h1 className="text-3xl font-bold">OpenRouter Chat Demo</h1>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl flex flex-col gap-4"
            >
                <label className="flex flex-col gap-2">
                    <span className="font-medium">Ask a question</span>
                    <textarea
                        className="border rounded p-2 min-h-[100px]"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask anything..."
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="rounded bg-blue-600 text-white px-4 py-2 disabled:opacity-60"
                >
                    {loading ? "Thinking..." : "Send"}
                </button>
            </form>

            {error && (<div className="w-full max-w-xl text-red-600 border border-red-200 bg-red-50 p-3 rounded">
                    {error}
                </div>)}

            {answer && (<div className="w-full max-w-xl border rounded p-4 bg-gray-50 whitespace-pre-wrap">
                    {answer}
                </div>)}
        </main>);
}
