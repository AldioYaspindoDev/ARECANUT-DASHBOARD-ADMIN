import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { name: 'Dashboard', path: '/', iconClass: 'bg-current' },
    { name: 'Manajemen User', path: '/users', iconClass: 'bg-current' },
    { name: 'Data Pinang', path: '/pinang-data', iconClass: 'bg-current' },
    { name: 'Riwayat Deteksi', path: '/history', iconClass: 'bg-current' },
    { name: 'Manajemen Artikel', path: '/articles', iconClass: 'bg-current' },
    { name: 'Manajemen Harga', path: '/prices', iconClass: 'bg-current' },
    { name: 'Pengaturan', path: '/settings', iconClass: 'bg-current' },
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
        <div className="self-stretch pb-8 flex flex-col justify-start items-start">
          <div className="self-stretch px-4 inline-flex justify-start items-center gap-3">
            <div className="w-8 h-8 bg-emerald-900 rounded-lg flex justify-center items-center flex-shrink-0">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <div className="inline-flex flex-col justify-start items-start">
              <span className="text-xl font-bold font-['Inter'] leading-6 text-emerald-900">
                Pinang AI Admin
              </span>
              <span className="text-neutral-500 text-[10px] font-medium font-['Inter'] leading-3 uppercase tracking-wider">
                Agricultural Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto px-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-colors font-semibold font-['Inter'] text-xs leading-4 tracking-wide ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-900 border-r-4 border-emerald-900'
                    : 'text-neutral-700 hover:bg-zinc-100 hover:text-zinc-900'
                }`
              }
            >
              <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                <div className={`w-3.5 h-3.5 rounded-sm opacity-80`} style={{ backgroundColor: 'currentColor' }} />
              </div>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}