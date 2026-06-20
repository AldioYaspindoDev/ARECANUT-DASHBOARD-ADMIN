import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo2.png';
import { IoHome, IoLeaf } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { FaRupiahSign } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { name: 'Dashboard', path: '/', iconClass: IoHome },
    { name: 'Manajemen User', path: '/users', iconClass: FaUser },
    { name: 'Data Pinang', path: '/pinang-data', iconClass: IoLeaf },
    { name: 'Riwayat Deteksi', path: '/history', iconClass: FaHistory },
    { name: 'Manajemen Artikel', path: '/articles', iconClass: MdLibraryBooks },
    { name: 'Manajemen Harga', path: '/prices', iconClass: FaRupiahSign },
    { name: 'Pengaturan', path: '/settings', iconClass: IoMdSettings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col border-r border-stone-200 bg-gray-50 py-8 px-4 transition-transform duration-300 ease-in-out md:sticky md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header / Logo */}
        <NavLink to={'/'}>
          <div className="self-stretch pb-8 flex flex-col justify-start items-start">
          <div className="self-stretch px-4 inline-flex justify-start items-center gap-3">
            <div className='w-12'>
              <img src={Logo} alt="Logo" />
            </div>
            <div className="inline-flex flex-col justify-start items-start">
              <span className="text-xl font-bold font-['Inter'] leading-6 text-[#572B18]">
                ArecaNut <span className='text-emerald-700'>Grade</span>
              </span>
              <span className="text-neutral-500 text-[10px] font-medium font-['Inter'] leading-3 uppercase tracking-wider">
                Agricultural Intelligence
              </span>
            </div>
          </div>
        </div>
        </NavLink>


        {/* Sidebar Menu Items */}
        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto px-2">
          {menuItems.map((item) => {
            const Icon = item.iconClass;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-colors font-semibold font-['Inter'] text-xs leading-4 tracking-wide ${
                    isActive
                      ? 'bg-emerald-100/50 text-[#572B18]'
                      : 'text-neutral-700 hover:bg-zinc-100 hover:text-zinc-900'
                  }`
                }
              >
                <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}