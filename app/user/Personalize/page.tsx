"use client";
import { client } from "@/sanity/lib/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const UserForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    interests: [] as string[],
    preferences: [] as string[],
    levelPreference: "Beginner",
    preferredLanguage: "English",
    courseName: "", // New field
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (
    field: "interests" | "preferences",
    value: string
  ) => {
    setFormData((prev) => {
      const updated = prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await client.create({
      _type: "userPreferences",
      userId: crypto.randomUUID(),
      interests: formData.interests,
      preferences: formData.preferences,
      levelPreference: formData.levelPreference,
      preferredLanguage: formData.preferredLanguage,
      courseName: formData.courseName,
    });

    const queryParams = new URLSearchParams({
      level: formData.levelPreference,
      language: formData.preferredLanguage,
      course: formData.courseName,
    });

    router.push(`/user/Course?${queryParams.toString()}`);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6"
      >
        {/* Interests */}
        <div>
          <label className="block mb-1 text-sm text-green-400 font-semibold">
            Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {interestsOptions.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => handleMultiSelect("interests", item)}
                className={`px-3 py-1 text-xs rounded-full border ${
                  formData.interests.includes(item)
                    ? "bg-gradient-to-r from-blue-400 to-green-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <label className="block mb-1 text-sm text-green-400 font-semibold">
            Trending Course Preferences
          </label>
          <div className="flex flex-wrap gap-2">
            {trendingCourses.map((course) => (
              <button
                type="button"
                key={course}
                onClick={() => handleMultiSelect("preferences", course)}
                className={`px-3 py-1 text-xs rounded-full border ${
                  formData.preferences.includes(course)
                    ? "bg-gradient-to-r from-blue-400 to-green-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Level */}
        <div>
          <label className="block mb-1 text-sm text-green-400 font-semibold">
            Skill Level
          </label>
          <select
            name="levelPreference"
            value={formData.levelPreference}
            onChange={handleSelectChange}
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block mb-1 text-sm text-green-400 font-semibold">
            Preferred Language
          </label>
          <select
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleSelectChange}
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white"
          >
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Course Name Search */}
        <div>
          <label className="block mb-1 text-sm text-green-400 font-semibold">
            Specific Course Name (Optional)
          </label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            placeholder="e.g., React, Docker"
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-400 to-green-500 text-white font-semibold py-2 rounded-lg"
        >
          Explore Courses
        </button>
      </form>
    </div>
  );
};

export default UserForm;
