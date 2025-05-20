"use client";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Image from "next/image";

type Roadmap = {
  title: string;
  description: string;
  pdf?: { asset: { url: string } };
  image?: { asset: { url: string } };
};

export default function RoadmapPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [search, setSearch] = useState("");
  const [activeRoadmap, setActiveRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const query = `*[_type == "roadmap"]{
          title, description, 
          pdf { asset->{url} },
          image { asset->{url} }
        }`;
        const data = await client.fetch(query);
        setRoadmaps(data);
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
      }
    };
    fetchRoadmaps();
  }, []);

  const filteredRoadmaps = roadmaps.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  if (roadmaps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-300">Loading roadmap...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Gradient Heading */}
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Your Learning Roadmap
      </h2>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6 relative">
        <Search className="absolute top-3 left-3 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search roadmap..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
        />
      </div>

      {/* Roadmap Grid */}
      {filteredRoadmaps.length === 0 ? (
        <div className="text-center text-gray-300">No roadmaps found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-xl transition cursor-pointer animate-fade-in hover:ring-2 hover:ring-teal-400 shadow-cyan-300/40"
              onClick={() => setActiveRoadmap(roadmap)}
            >
              <h3 className="text-lg font-semibold mb-2 text-white truncate">
                {roadmap.title}
              </h3>
              {roadmap.image?.asset?.url && (
                <Image
                  src={roadmap.image.asset.url}
                  alt={roadmap.title}
                  className="w-full h-36 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Popup Modal */}
      {activeRoadmap && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 animate-slide-fade-in"
          onClick={() => setActiveRoadmap(null)}
        >
          <div
            className="relative bg-gray-800 p-6 rounded-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto transform scale-95 hover:scale-100 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveRoadmap(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <X size={28} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-white">
              {activeRoadmap.title}
            </h2>
            {activeRoadmap.image?.asset?.url && (
              <Image
                src={activeRoadmap.image.asset.url}
                alt={activeRoadmap.title}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
            )}
            <p className="text-gray-300 mb-4">{activeRoadmap.description}</p>
            {activeRoadmap.pdf?.asset?.url ? (
              <iframe
                src={`${activeRoadmap.pdf.asset.url}?toolbar=0&navpanes=0&scrollbar=0`}
                title="Roadmap PDF"
                className="w-full h-[40vh] rounded-lg"
                frameBorder="0"
              />
            ) : (
              <p className="text-red-500">No PDF available.</p>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }
        @keyframes slide-fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-fade-in {
          animation: slide-fade-in 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
