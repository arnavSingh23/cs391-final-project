import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    process.env.SUPABASE_SERVICE_KEY ||
    "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || supabaseServiceKey;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

const TITLE_MAX = 120;
const DESCRIPTION_MAX = 1000;

export async function POST(req: Request) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: "Supabase credentials not configured" }, { status: 500 });
    }

    const { title: rawTitle, description: rawDescription, repoUrl } = await req.json();

    const title = (rawTitle || "").trim();
    const description = (rawDescription || "").trim();

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }
    if (title.length > TITLE_MAX) {
      return NextResponse.json({ error: `Title must be ${TITLE_MAX} characters or less` }, { status: 400 });
    }
    if (description.length > DESCRIPTION_MAX) {
      return NextResponse.json({ error: `Description must be ${DESCRIPTION_MAX} characters or less` }, { status: 400 });
    }

    // Use service role client to bypass RLS for server-side insert
    const { data, error } = await supabaseAdmin.from("projects").insert([
      {
        title,
        description,
        repo_url: repoUrl,
        timestamp: new Date().toISOString(),
      },
    ]).select().single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ project: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: "Supabase credentials not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

    // Use service role to avoid RLS blocking reads
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("timestamp", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ projects: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
