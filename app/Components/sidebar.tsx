import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="h-screen w-64  text-white flex flex-col py-8 px-4 border-r border-gray-800">
      <h1 className="text-3xl font-bold text-center mb-10">GenZ-Way</h1>
      <nav className="flex flex-col gap-6">
        <Link
          href="/user/dashboard"
          className="hover:text-green-400 transition"
        >
          Dashboard
        </Link>
        <Link
          href="/user/dashboard/progress"
          className="hover:text-green-400 transition"
        >
          Progress
        </Link>
        <Link
          href="/user/dashboard/settings"
          className="hover:text-green-400 transition"
        >
          Settings
        </Link>
        <Link
          href="/user/dashboard/support"
          className="hover:text-green-400 transition"
        >
          Support
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
