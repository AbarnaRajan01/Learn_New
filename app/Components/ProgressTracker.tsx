"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

interface UserActivity {
  courseId: string;
  status: string;
}

interface Course {
  title: string;
  progress: number;
}

interface ProgressProps {
  title: string;
  value: number;
  goal: string;
}

const ProgressTracker = () => {
  const [progress, setProgress] = useState<number[]>([0, 0, 0]);
  const [userId] = useState<string>("user123");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const activityData: UserActivity[] = await client.fetch(
          `*[_type == "userActivity" && userId == $userId]{ courseId, status }`,
          { userId }
        );

        if (!activityData || activityData.length === 0) {
          setError("No user activity found.");
          return;
        }

        const userCourses: Course[] = await client.fetch(
          `*[_type == "course" && _id in $courseIds]{ title, progress }`,
          { courseIds: activityData.map((a) => a.courseId) }
        );

        const updatedProgress = [
          userCourses.filter((c) => c.progress >= 100).length,
          userCourses.filter((c) => c.progress >= 50).length,
          userCourses.filter((c) => c.progress < 50).length,
        ];

        setProgress(updatedProgress);
      } catch (error) {
        console.error("Error fetching progress data:", error);
        setError("An error occurred while fetching progress data.");
      }
    };

    fetchProgressData();
  }, [userId]);

  const progressData: ProgressProps[] = [
    { title: "Courses", value: progress[0], goal: "Finish Next.js Mastery" },
    { title: "Projects", value: progress[1], goal: "Launch Portfolio" },
    { title: "Community", value: progress[2], goal: "Publish First Blog" },
  ];

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-md flex flex-col items-center gap-6 w-full max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Your Journey
        {/* 🚀 */}
      </h3>

      {error && <p className="text-red-700 text-sm">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full justify-items-center">
        {progressData.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="#333"
                  strokeWidth="10%"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="#00ADB5"
                  strokeWidth="10%"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (progress[idx] / 100) * 283}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-white">
                  {progress[idx]}%
                </span>
                <span className="text-xs text-[#aaa]">{item.title}</span>
              </div>
            </div>

            <p className="mt-2 text-center text-xs text-[#888] max-w-[120px]">
              🎯{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                {item.goal}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
