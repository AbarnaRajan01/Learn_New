const suggestions = [
  "🔥 Start the 'Advanced Next.js' course next!",
  "💡 Contribute to open-source projects!",
  "🚀 Build a SaaS project idea you have!",
];

const AIAssistant = () => {
  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-md">
      <div className="flex ">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-4">
          AI Assistant
        </h3>
        {/* <span className="p-1">🤖</span> */}
      </div>

      <ul className="space-y-3">
        {suggestions.map((tip, index) => (
          <li
            key={index}
            className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-md text-white hover:bg-[#00ADB5]/10 transition-colors"
          >
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIAssistant;
