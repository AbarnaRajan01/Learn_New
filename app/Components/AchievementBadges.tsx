const badges = [
  { title: "First Login 🚀", achieved: true },
  { title: "Completed First Course 🎯", achieved: false },
  { title: "Built First Project 🛠️", achieved: false },
];

const AchievementBadges = () => {
  return (
    <div className="p-6 bg-gray-900 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-6">
        Achievements
        {/* 🏆 */}
      </h3>

      <div className="flex flex-wrap gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`px-5 py-2.5 rounded-full font-medium shadow-lg transition-all duration-300 ${
              badge.achieved
                ? "  text-white bg-gradient-to-r from-green-400 to-blue-500"
                : " bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 text-[#aaa]"
            }`}
          >
            {badge.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;
