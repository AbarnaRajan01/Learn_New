import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client"; // Sanity client

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received user details:", body);

    // Validate incoming data
    const { userId, interests, levelPreference, preferredLanguage } = body;

    if (!userId || !interests || !levelPreference || !preferredLanguage) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Check if the user already has preferences saved
    const existingPreferences = await client.fetch(
      `*[_type == "userPreferences" && userId == $userId][0]`,
      { userId }
    );

    // If the preferences exist, update the document; otherwise, create a new one
    const userDoc = {
      _type: "userPreferences",
      name: userId, // Unique identifier
      interests,
      levelPreference,
      preferredLanguage,
      _id: existingPreferences?._id || `user-${userId}`, // Use existing _id or generate a new one
    };

    const response = await client.createOrReplace(userDoc);
    console.log("User preferences saved:", response);

    return NextResponse.json({ success: true, message: "User details saved successfully" });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ success: false, message: "Error saving user details" }, { status: 500 });
  }
}
