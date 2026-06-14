import { useEffect, useState } from "react";
import type { UserData } from "../../interface/User";
import { UserService } from "../../services/userService";

export default function Users() {
  
  const[user, setUser] = useState<UserData[]>([]);
  const[loading, setLoading] = useState(false);

  useEffect(()=> {
    const getUser = async () => {
      try {
        const data = await UserService.GetAllUser();
        setUser(data);
      } catch (error) {
        console.error("gagal mendapatkan data", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if(loading){
    return<p>Loading ... </p>
  }


  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">Manajemen User</h1>
          <p className="text-neutral-500 text-sm font-normal font-['Inter'] mt-1">Mengelola dan mengatur role seluruh pengguna dalam ekosistem Pinang AI.</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <span className="text-base font-bold">+</span>
          <span>Tambah Admin Baru</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari username atau email..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-100 rounded-lg border border-transparent focus:border-stone-300 focus:bg-white outline-none text-sm font-['Inter'] transition-colors"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-400 rounded-full" />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-neutral-500 text-xs font-medium font-['Inter']">Filter Role:</span>
          <button className="px-4 py-1.5 bg-zinc-800 text-white text-xs font-semibold rounded-full">Semua</button>
          <button className="px-4 py-1.5 bg-gray-100 text-neutral-700 hover:bg-gray-200 text-xs font-semibold rounded-full transition-colors">Petani</button>
          <button className="px-4 py-1.5 bg-gray-100 text-neutral-700 hover:bg-gray-200 text-xs font-semibold rounded-full transition-colors">Pengepul</button>
          <button className="px-4 py-1.5 bg-gray-100 text-neutral-700 hover:bg-gray-200 text-xs font-semibold rounded-full transition-colors">Admin</button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-stone-200">
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">ID User</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Username</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Tanggal Terdaftar</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150">
              {user.map((UserData) => (
                <tr key={UserData.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 text-neutral-500 text-sm font-mono">{UserData.id}</td>
                  <td className="px-6 py-4 text-zinc-900 text-sm font-medium">{UserData.username}</td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">{UserData.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold">
                      {UserData.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">{UserData.created_at}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-neutral-700 rounded-md transition-colors text-xs font-medium">Edit</button>
                      <button className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md transition-colors text-xs font-medium">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-neutral-500 text-xs font-['Inter']">Menampilkan 1-4 dari 42 pengguna</span>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-stone-200 rounded-md opacity-50 hover:opacity-100 transition-opacity">
              &lt;
            </button>
            <button className="w-8 h-8 bg-emerald-900 text-white rounded-md text-xs font-semibold flex items-center justify-center">1</button>
            <button className="w-8 h-8 hover:bg-zinc-100 rounded-md text-xs font-semibold flex items-center justify-center">2</button>
            <button className="w-8 h-8 hover:bg-zinc-100 rounded-md text-xs font-semibold flex items-center justify-center">3</button>
            <span className="px-1 text-neutral-500">...</span>
            <button className="p-2 border border-stone-200 rounded-md hover:bg-zinc-50 transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}