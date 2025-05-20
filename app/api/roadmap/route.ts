import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

type Roadmap = {
  title: string;
  description: string;
  steps: string[];
  image?: {
    asset: {
      url: string;
    };
  };
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const stack = url.searchParams.get('stack');

    if (!stack) {
      return NextResponse.json(
        { message: 'Missing or invalid "stack" query' },
        { status: 400 }
      );
    }

    const query = `*[_type == "roadmap" && slug.current == $slug][0]{
      title,
      description,
      steps,
      image {
        asset->{
          url
        }
      }
    }`;

    const roadmap = await client.fetch<Roadmap>(query, { slug: stack });

    if (!roadmap) {
      return NextResponse.json({ message: 'Roadmap not found' }, { status: 404 });
    }

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
