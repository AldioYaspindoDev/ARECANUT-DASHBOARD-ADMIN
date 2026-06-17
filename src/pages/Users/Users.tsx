import { useEffect, useState } from "react";
import type { UserData } from "../../interface/User";
import { UserService } from "../../services/userService";

export default function Users() {
  const [user, setUser] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");

  const getUser = async () => {
    setLoading(true);
    try {
      const data = await UserService.GetAllUser();
      setUser(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal mendapatkan data user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handlePromote = async (userId: string, username: string) => {
    if (confirm(`Apakah Anda yakin ingin mempromosikan ${username} menjadi Admin?`)) {
      try {
        await UserService.PromoteUser(userId);
        alert(`Berhasil mempromosikan ${username} menjadi Admin!`);
        getUser();
      } catch (error) {
        console.error("Gagal mempromosikan user:", error);
        alert("Gagal mempromosikan user. Pastikan Anda memiliki hak akses admin.");
      }
    }
  };

  // Filter & Search Logic
  const filteredUsers = user.filter((u) => {
    const matchesSearch =
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    
    if (roleFilter === "Semua") return matchesSearch;
    return matchesSearch && u.role.toLowerCase() === roleFilter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-950"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">Manajemen User</h1>
          <p className="text-neutral-500 text-sm font-normal font-['Inter'] mt-1">Mengelola dan mengatur role seluruh pengguna dalam ekosistem Pinang AI.</p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari username atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-100 rounded-lg border border-transparent focus:border-stone-300 focus:bg-white outline-none text-sm font-['Inter'] transition-colors"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-400 rounded-full flex items-center justify-center text-[10px] text-white">🔍</div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-neutral-500 text-xs font-medium font-['Inter']">Filter Role:</span>
          {["Semua", "Petani", "Admin"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                roleFilter === role
                  ? "bg-emerald-900 text-white"
                  : "bg-gray-100 text-neutral-700 hover:bg-gray-200"
              }`}
            >
              {role}
            </button>
          ))}
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-neutral-500 text-sm">
                    Tidak ada user ditemukan
                  </td>
                </tr>
              ) : (
                filteredUsers.map((userData) => (
                  <tr key={userData.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 text-neutral-500 text-sm font-mono">{userData.id}</td>
                    <td className="px-6 py-4 text-zinc-900 text-sm font-medium">{userData.username}</td>
                    <td className="px-6 py-4 text-neutral-600 text-sm">{userData.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          userData.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {userData.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 text-sm">
                      {new Date(userData.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {userData.role !== "admin" && (
                        <button
                          onClick={() => handlePromote(userData.id, userData.username)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 rounded-md transition-colors text-xs font-semibold"
                        >
                          Promosikan Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}