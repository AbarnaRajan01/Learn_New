"use client";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

type Course = {
  title: string;
  description: string;
  level: string;
  language: string;
  url: string;
  image?: { asset: { url: string } };
};

export default function CoursePage() {
  const searchParams = useSearchParams();

  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    searchParams.get("language") || ""
  );
  const [selectedLevel, setSelectedLevel] = useState(
    searchParams.get("level") || ""
  );

  // ✅ Grab course name from query params and set as initial search value
  const initialCourseName = searchParams.get("course") || "";
  const [search, setSearch] = useState(initialCourseName);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const query = `*[_type == "course"]{
          title, description, level, language, url,
          image { asset->{url} }
        }`;
        const data = await client.fetch(query);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesLanguage = selectedLanguage
      ? c.language === selectedLanguage
      : true;
    const matchesLevel = selectedLevel ? c.level === selectedLevel : true;
    return matchesSearch && matchesLanguage && matchesLevel;
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Explore Our Courses
      </h2>

      <div className="max-w-5xl mx-auto mb-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-gray-800 text-white"
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Tamil">Tamil</option>
        </select>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-gray-800 text-white"
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center text-gray-300">No courses found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer"
              onClick={() => setActiveCourse(course)}
            >
              <h3 className="text-lg font-semibold mb-2 text-white truncate">
                {course.title}
              </h3>
              {course.image?.asset?.url && (
                <img
                  src={course.image.asset.url}
                  alt={course.title}
                  className="w-full h-36 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-sm text-gray-400">
                {course.level} | {course.language}
              </p>
              <p className="text-gray-300 mt-2 text-sm">{course.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeCourse && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setActiveCourse(null)}
        >
          <div
            className="relative bg-gray-800 p-6 rounded-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCourse(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <X size={28} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">
              {activeCourse.title}
            </h2>
            {activeCourse.image?.asset?.url && (
              <img
                src={activeCourse.image.asset.url}
                alt={activeCourse.title}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
            )}
            <p className="text-gray-300 mb-4">{activeCourse.description}</p>
            <a
              href={activeCourse.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gradient-to-r from-teal-500 to-teal-400 text-white py-2 px-4 rounded-md shadow-lg hover:scale-105"
            >
              Watch Course Video
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
