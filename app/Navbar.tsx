"use client";

// import { signOutAction, signInAction } from '@/lib/actions/auth-actions';
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signInAction, signOutAction } from "@/auth-action";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-8 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-md">
      <nav className="flex justify-between items-center text-white">
        <Link
          href="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
        >
          GenZ-Way
        </Link>

        <div className="hidden md:flex gap-6 font-medium text-sm text-green-300">
          {["Courses", "Road Maps", "Playground", "AI Classes"].map((item) => {
            const href = `/user/${item.replace(/\s/g, "")}`;
            return (
              <Link
                key={item}
                href={href}
                className="relative group hover:text-blue-400 cursor-pointer"
              >
                {item}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-6">
          {session?.user ? (
            <>
              <Link
                href="/user/dashboard"
                className="flex items-center gap-3 group"
              >
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt="Profile picture"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-green-400 shadow-md group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                  />
                )}
              </Link>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="px-5 py-2 hover:bg-gradient-to-r from-blue-400 to-green-500 text-white shadow-cyan-500/50 rounded-xl font-semibold transition-all duration-300 shadow-md"
                >
                  Log Out
                </button>
              </form>
            </>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="px-5 py-2 shadow-cyan-500/50 hover:bg-gradient-to-r from-blue-400 to-green-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-md"
                >
                  Login
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>GitHub Account Needed!</AlertDialogTitle>
                  <AlertDialogDescription>
                    You can only login to this website if you have your own
                    GitHub account. If you don&apos;t have one, please create it
                    first
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <form action={signInAction}>
                      <button type="submit">Continue</button>
                    </form>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
