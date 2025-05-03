
import { auth } from "@/auth"; // your auth helper
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth(); // This gets the user session

  if (!session?.user) {
    return NextResponse.json({ error: "No user session found" }, { status: 401 });
  }

  return NextResponse.json({ userId: session.user.id });
}
