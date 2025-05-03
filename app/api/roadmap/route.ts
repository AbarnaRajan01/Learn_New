import { client } from '@/sanity/lib/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Roadmap = {
  title: string;
  description: string;
  steps: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { stack } = req.query;

  if (!stack || typeof stack !== 'string') {
    return res.status(400).json({ message: 'Missing or invalid "stack" query' });
  }

  try {
    const query = `*[_type == "roadmap"][0]{
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
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    res.status(200).json(roadmap);
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
