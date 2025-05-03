"use client";
import { useEffect, useState } from "react";

import AchievementBadges from "@/app/Components/AchievementBadges";
import AIAssistant from "@/app/Components/AiAssistant";
import ProgressTracker from "@/app/Components/ProgressTracker";
import { client } from "@/sanity/lib/client";

const DashboardHome = () => {
  const [userActivity, setUserActivity] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchUserActivity = async () => {
      const activity = await client.fetch(`
        *[_type == "userActivity" && userId == "user123"]{
          courseId,
          status
        }
      `);

      if (activity.length === 0) {
        setShowAlert(true);
      }

      setUserActivity(activity);
    };

    fetchUserActivity();
  }, []);

  return (
    <section className="space-y-8">
      {/* Custom Alert Box */}
      {showAlert && (
        <div className="p-4 border-l-4 border-[#00FFC6] bg-[#1a1a1a] text-white rounded-lg shadow-md flex justify-between items-center">
          <div>
            <p className="font-semibold text-[#00FFC6] mb-1">
              No Activity Yet! 🚨
            </p>
            <p className="text-sm text-gray-300">
              Start your first course to begin your journey.
            </p>
          </div>
          <button
            onClick={() => setShowAlert(false)}
            className="ml-4 px-4 py-1 rounded-full border border-[#00FFC6] text-[#00FFC6] hover:bg-[#00ffc615] transition"
          >
            Got it
          </button>
        </div>
      )}

      {/* User Activity */}
      <div>
        <h2 className="text-xl font-bold p-5 text-white">Your Activity</h2>
        <ul className="list-disc pl-5 text-gray-300">
          {userActivity.length > 0 ? (
            userActivity.map((activity) => (
              <li key={activity.courseId}>
                <strong>{activity.courseId}</strong> - {activity.status}
              </li>
            ))
          ) : (
            <p className="p-1 text-red-400">No activity yet!</p>
          )}
        </ul>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        <ProgressTracker />
        <AchievementBadges />
        <AIAssistant />
      </div>
    </section>
  );
};

export default DashboardHome;
