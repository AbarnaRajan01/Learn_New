"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const UserDetailsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: "",
    preferences: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/user/save-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          interests: formData.interests
            .split(",")
            .map((interest) => interest.trim()),
          role: "student",
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/user/dashboard");
      } else {
        alert("Failed to save details. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting details:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-pulse">
        Enter Your Details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-xl p-8 rounded-xl backdrop-blur-lg bg-opacity-40 border border-white/20 shadow-xl transform transition-all duration-500 hover:scale-105"
      >
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input-style"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input-style"
          />
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="Interests (comma-separated)"
            className="input-style"
          />
          <textarea
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="Your Preferences"
            className="input-style h-32"
          />
        </div>
        <button
          type="submit"
          className="p-3 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 ease-in-out transform hover:scale-105"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Saving...</span>
          ) : (
            "Save Details"
          )}
        </button>
      </form>

      {/* Styling extracted for reuse */}
      <style jsx>{`
        .input-style {
          padding: 1rem;
          width: 100%;
          border: 2px solid transparent;
          border-radius: 0.5rem;
          background: transparent;
          color: white;
          placeholder-color: gray;
          outline: none;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
        }
        .input-style:focus {
          border-color: #34d399; /* Tailwind green-400 */
        }
      `}</style>
    </div>
  );
};

export default UserDetailsPage;
