import { NextRequest, NextResponse } from "next/server";

// 1. Define valid prompt topic keys
type Prompt = "AI" | "Web Development" | "Machine Learning" | "Quantum Computing" | "Blockchain";

// 2. Map of predefined prompts and responses
const predefinedPrompts: Record<Prompt, string> = {
  "AI": "Artificial Intelligence (AI) is the simulation of human intelligence by machines.",
  "Web Development": "Web development involves building websites and applications for the web using technologies like HTML, CSS, and JavaScript.",
  "Machine Learning": "Machine learning is a field of AI where systems learn patterns from data to make decisions without being explicitly programmed.",
  "Quantum Computing": "Quantum computing leverages quantum mechanics to process complex problems much faster than classical computers.",
  "Blockchain": "Blockchain is a decentralized digital ledger that securely records transactions across multiple systems without a central authority."
};

// 3. API route handler for POST requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt as Prompt;

    if (!prompt || !(prompt in predefinedPrompts)) {
      return NextResponse.json({ error: "Invalid or missing topic prompt." }, { status: 400 });
    }

    const answer = predefinedPrompts[prompt];
    return NextResponse.json({ answer }, { status: 200 });
  } catch (error: any) {
    console.error("Error processing prompt:", error.message || error);
    return NextResponse.json({ error: "Failed to generate response." }, { status: 500 });
  }
}
