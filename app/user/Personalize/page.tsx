"use client";
import { client } from "@/sanity/lib/client";
import { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [] as string[],
    preferences: [] as string[],
    role: "",
    levelPreference: "Beginner",
    preferredLanguage: "English", // Added the preferredLanguage state
  });

  const interestsOptions = [
    "Web Development",
    "Backend",
    "Frontend",
    "AI",
    "DevOps",
  ];

  const trendingCourses = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "AI/ML",
    "DevOps",
  ];

  const languageOptions = ["English", "Tamil", "Hindi"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (
    field: "interests" | "preferences",
    value: string
  ) => {
    setFormData((prev) => {
      const isSelected = prev[field].includes(value);
      const updated = isSelected
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await client.create({
      _type: "user",
      name: formData.name,
      email: formData.email,
      interests: formData.interests,
      preferences: formData.preferences.join(", "),
      role: formData.role,
    });

    await client.create({
      _type: "userPreferences",
      userId: formData.email,
      interests: formData.interests,
      levelPreference: formData.levelPreference,
      preferredLanguage: formData.preferredLanguage, // Adding preferredLanguage field
    });

    alert("Your information has been saved successfully!");
    setFormData({
      name: "",
      email: "",
      interests: [],
      preferences: [],
      role: "",
      levelPreference: "Beginner",
      preferredLanguage: "English", // Resetting preferredLanguage
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      {/* <h1 className="text-xl font-semibold mb-2 text-center text-gray-100">
        Tell Us About Yourself
      </h1> */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 rounded-2xl shadow-lg p-6 space-y-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-green-400 text-white"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-white"
          required
        />

        <div>
          <label className="block mb-1 text-sm text-green-400 font-semibold">
            Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {interestsOptions.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => handleMultiSelectChange("interests", item)}
                className={`px-3 py-1 text-xs rounded-full border ${
                  formData.interests.includes(item)
                    ? "bg-gradient-to-r from-blue-400 to-green-500 text-white"
                    : "bg-gray-700 text-gray-300"
                } hover:scale-105 transition`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm text-green-400 font-semibold">
            Preferences (Trending Courses)
          </label>
          <div className="flex flex-wrap gap-2">
            {trendingCourses.map((course) => (
              <button
                type="button"
                key={course}
                onClick={() => handleMultiSelectChange("preferences", course)}
                className={`px-3 py-1 text-xs rounded-full border ${
                  formData.preferences.includes(course)
                    ? "bg-gradient-to-r from-blue-400 to-green-500 text-white"
                    : "bg-gray-700 text-gray-300"
                } hover:scale-105 transition`}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role (e.g., Student, Developer)"
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 text-white"
        />

        <div>
          <label className="block mb-1 text-sm text-green-400 font-semibold">
            Level Preference
          </label>
          <select
            name="levelPreference"
            value={formData.levelPreference}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 text-white"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm text-green-400 font-semibold">
            Preferred Language
          </label>
          <select
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 text-white"
          >
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-400 to-green-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-green-500/50 transition duration-300 text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
