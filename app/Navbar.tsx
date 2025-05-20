import { auth, signIn, signOut } from "@/auth";
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
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-8 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-md">
      <nav className="flex justify-between items-center text-white">
        {/* Logo */}
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
                <span className="absolute inset-0 animate-sparkle group-hover:opacity-100"></span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-6">
          {session?.user ? (
            <>
              {/* Profile Link */}
              <Link
                href="/user/dashboard"
                className="flex items-center gap-3 group"
              >
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-green-400 shadow-md group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                    // For Next.js Image optimization, consider replacing <img> with next/image
                  />
                )}
              </Link>

              {/* Log Out Button */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="px-5 py-2 hover:bg-gradient-to-r from-blue-400 to-green-500 text-white shadow-cyan-500/50 rounded-xl font-semibold transition-all duration-300 shadow-md"
                >
                  Log Out
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Login Button inside Alert Dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="px-5 py-2 shadow-cyan-500/50 hover:bg-gradient-to-r from-blue-400 to-green-500 text-white hover:bg-green-600 rounded-xl font-semibold transition-all duration-300 shadow-md"
                  >
                    Login
                  </button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>GitHub Account Needed!</AlertDialogTitle>
                    <AlertDialogDescription>
                      You can only login to this website if you have your own
                      GitHub account. If you don't have one, please create it
                      first!
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction asChild>
                      <form
                        action={async () => {
                          "use server";
                          await signIn("github");
                        }}
                      >
                        <button type="submit">Continue</button>
                      </form>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
