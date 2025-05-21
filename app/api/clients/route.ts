import { NextResponse } from "next/server";

const WORKER_URL = "http://localhost:8787";

export async function GET() {
  const res = await fetch(`${WORKER_URL}/api/clients`);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${WORKER_URL}/api/clients`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
