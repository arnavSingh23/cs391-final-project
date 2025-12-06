import { NextResponse } from "next/server"; 
import { createClient } from "@supabase/supabase-js"; 
// kwabena


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ""; 
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE ||
  process.env.SUPABASE_SERVICE_KEY ||
  "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || supabaseServiceKey; // fallback key
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey); // admin client

const TITLE_MAX = 120; // title limit
const DESCRIPTION_MAX = 1000; // desc limit

export async function POST(req: Request) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: "Supabase credentials not configured" }, { status: 500 }); // check creds
    }

    const { title: rawTitle, description: rawDescription, repoUrl } = await req.json(); // get body

    const title = (rawTitle || "").trim(); // clean title
    const description = (rawDescription || "").trim(); // clean desc

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 }); // required fields
    }
    if (title.length > TITLE_MAX) {
      return NextResponse.json({ error: `Title must be ${TITLE_MAX} characters or less` }, { status: 400 }); // title too long
    }
    if (description.length > DESCRIPTION_MAX) {
      return NextResponse.json({ error: `Description must be ${DESCRIPTION_MAX} characters or less` }, { status: 400 }); // desc too long
    }

    // Use service role client to bypass RLS for server-side insert
    const { data, error } = await supabaseAdmin.from("projects").insert([
      {
        title, // project title
        description, // project desc
        repo_url: repoUrl, // repo link
        timestamp: new Date().toISOString(), // time now
      },
    ]).select().single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 }); // insert error
    }
    return NextResponse.json({ project: data }, { status: 201 }); // success
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 }); // catch error
  }
}

export async function GET(req: Request) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: "Supabase credentials not configured" }, { status: 500 }); // check creds
    }

    const { searchParams } = new URL(req.url); // get params
    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50); // max 50
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0); // min 0

    // Use service role to avoid RLS blocking reads
    const { data, error } = await supabaseAdmin
      .from("projects") // table name
      .select("*") // all fields
      .order("timestamp", { ascending: false }) // newest first
      .range(offset, offset + limit - 1); // pagination

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 }); // query error
    }
    return NextResponse.json({ projects: data }, { status: 200 }); // success
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 }); // catch error
  }
}
