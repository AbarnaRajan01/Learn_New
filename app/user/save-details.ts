import { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

// Initialize Sanity client
const client = sanityClient({
  projectId: "your-project-id", // Replace with your Sanity project ID
  dataset: "production", // Replace with your Sanity dataset
  useCdn: false, // Set to `true` for production, `false` for more fresh data
});

const saveUserDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { name, email, interests, preferences } = req.body;

      // Create a new user document in Sanity
      const newUser = await client.create({
        _type: "user", // Make sure you have this type defined in your Sanity schema
        name,
        email,
        interests,
        preferences,
      });

      return res.status(200).json({ success: true, data: newUser });
    } catch (error) {
      console.error("Error saving user details:", error);
      return res.status(500).json({ success: false, message: "Error saving details" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default saveUserDetails;
