import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import type { UserData } from '../../interface/User';
import { UserService } from '../../services/userService';
import { API_BASE_URL } from '../../utils/constants';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
     setLoading(true);
     try {
        const response = await UserService.getCurrentUser();
        setUser(response); 
     } catch (error) {
        console.error("gagal Mendapatkan user", error);
     } finally{
        setLoading(false);
     }
  }

  useEffect(() => {
    getUserData();
  },[]);

    const getImageUrl = (path?: string) => {
        if (!path) return "https://placehold.co/80x85?text=No+Image";
        if (path.startsWith("http://") || path.startsWith("https://")) return path;
        const cleanPath = path.startsWith("/") ? path.substring(1) : path;
        return `${API_BASE_URL}/${cleanPath}`;
    };
  

  if(loading){
    return(
      <div className='items-center justify-center'>
        <div className='animate-spin'></div>
      </div>
    )
  }

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
          {user && (
          <div className="flex items-center gap-4">
            {/* Username */}
            <div>
              <p>Hello {user.username || "Admin"}</p>
            </div>
            {/* Notifications */}
            <div className="relative cursor-pointer hover:opacity-80 p-1">
              <IoIosNotifications className='text-2xl'/>
              <div className="w-2 h-2 right-0 top-0 absolute bg-red-700 rounded-full border border-gray-50" />
            </div>


            {/* Profile Avatar */}
            <div className="w-8 h-8 bg-zinc-200 rounded-full outline outline-1 outline-offset-[-1px] outline-stone-300 overflow-hidden cursor-pointer hover:opacity-90">
              <img className="w-full h-full object-cover" src={getImageUrl(user.photoProfile)} alt="Avatar" />
            </div>
          </div>
          )}
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
