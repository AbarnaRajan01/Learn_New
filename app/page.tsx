import React from "react";
import Image from "next/image";
import avatar from "../app/Assets/avatar.png";
import Link from "next/link";
import "./globals.css";

const page = () => {
  return (
    <div className="flex flex-col md:flex-row  justify-between px-8 py-16 min-h-screen bg-black">
      {/* Text Section */}
      <div className="max-w-full overflow-x-auto  mt-40 ">
        <h1 className="text-3xl md:text-5xl ml-30 font-bold text-white text-shadow-glow whitespace-nowrap">
          <span className="mr-2">Welcome to</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-600">
            GenZ - Way
          </span>
        </h1>
        <p className="text-lg text-white text-shadow-glow mt-5 ml-30">
          A Learn and Compete Platform
        </p>
        <div className="flex items-center gap-4 ml-30 mt-10">
          {/* Animated hand */}
          <span className="animate-wiggle text-3xl">👉</span>

          {/* Button */}
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-green-500 text-white font-semibold shadow-lg hover:shadow-green-500/50 transition duration-300 text-shadow-glow">
            <Link href="/user/Personalize">Personlize</Link>
          </button>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="mt-10 md:mt-0 group">
        <div className="w-110 h-110 rounded-full mr-30 border-cyan-400 shadow-xl  transition-all duration-500 group-hover:scale-105 shadow-cyan-500/50 relative z-10 hover:bg-gradient-to-r from-green-400 to-blue-500">
          <Image
            src={avatar}
            alt="Avatar Image"
            width={300}
            height={300}
            className="w-120 h-120 mr-30"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
