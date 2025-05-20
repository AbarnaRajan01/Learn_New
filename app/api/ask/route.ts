import { NextRequest, NextResponse } from 'next/server';

type Prompt = 'AI' | 'Web Development' | 'Machine Learning' | 'Quantum Computing' | 'Blockchain';

const predefinedPrompts: Record<Prompt, string> = {
  AI: 'Artificial Intelligence (AI) is the simulation of human intelligence by machines.',
  'Web Development': 'Web development involves building websites and applications for the web using technologies like HTML, CSS, and JavaScript.',
  'Machine Learning': 'Machine learning is a field of AI where systems learn patterns from data to make decisions without being explicitly programmed.',
  'Quantum Computing': 'Quantum computing leverages quantum mechanics to process complex problems much faster than classical computers.',
  Blockchain: 'Blockchain is a decentralized digital ledger that securely records transactions across multiple systems without a central authority.',
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const prompt = body.prompt as Prompt;

    if (!prompt || !(prompt in predefinedPrompts)) {
      return NextResponse.json({ error: 'Invalid or missing topic prompt.' }, { status: 400 });
    }

    const answer = predefinedPrompts[prompt];
    return NextResponse.json({ answer }, { status: 200 });
  } catch (error) {
    console.error('Error processing prompt:', (error as Error).message);
    return NextResponse.json({ error: 'Failed to generate response.' }, { status: 500 });
  }
}
