export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-01';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);
export const token = assertValue(
  "skHAPnUq4UbGVxNH9rfeCo4jlezvpPt4v81exzBiMa5nYhyLTluFRfKoHfSxVj9sTTIpRkSukBS92MucGl5gM9e6fLza7He2GJs7tJ1sH4jDySvx6gO0GoYQnzwMCWL95H1yxuvtASR8O8nysyR94fkqdyaqEaQEYfH0ekDnz3d5slcfFeY8",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);



function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
