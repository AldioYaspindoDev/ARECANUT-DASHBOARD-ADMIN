import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-zinc-900 font-sans">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-stone-200 bg-gray-50/80 px-4 md:px-8 backdrop-blur-md">
          {/* Left section: Hamburger button & search */}
          <div className="flex items-center gap-4 flex-1">
            {/* Hamburger button (visible on mobile only) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-zinc-600 hover:bg-stone-50 md:hidden"
              aria-label="Open sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Search Bar */}
            <div className="w-full max-w-xs px-4 py-2 bg-zinc-100 rounded-full outline outline-1 outline-offset-[-1px] outline-stone-300 flex justify-start items-center">
              <div className="pr-2 inline-flex flex-col justify-start items-start">
                <FaSearch/>
              </div>
              <input
                type="text"
                placeholder="Cari data..."
                className="w-full bg-transparent border-none outline-none text-zinc-800 placeholder-neutral-500 text-sm font-normal font-['Inter']"
              />
            </div>
          </div>

          {/* Right section: Notifications & Avatar */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative cursor-pointer hover:opacity-80 p-1">
              <IoIosNotifications className='text-2xl'/>
              <div className="w-2 h-2 right-0 top-0 absolute bg-red-700 rounded-full border border-gray-50" />
            </div>

            {/* Profile Avatar */}
            <div className="w-8 h-8 bg-zinc-200 rounded-full outline outline-1 outline-offset-[-1px] outline-stone-300 overflow-hidden cursor-pointer hover:opacity-90">
              <img className="w-full h-full object-cover" src="https://placehold.co/30x30" alt="Avatar" />
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
