import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId,token } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: typeof window !== 'undefined', // ✅ CDN only on client side
  token
});
