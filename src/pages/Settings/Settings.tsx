import { useEffect, useState, useRef } from "react";
import type { UserData } from "../../interface/User";
import { UserService } from "../../services/userService";
import { API_BASE_URL } from "../../utils/constants";

export default function Settings() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await UserService.getCurrentUser();
      setUser(response); 
      setUsername(response.username || "");
      setEmail(response.email || "");
    } catch (error) {
      console.error("No User", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  const getImageUrl = (path?: string) => {
      if (!path) return "https://placehold.co/80x85?text=No+Image";
      if (path.startsWith("http://") || path.startsWith("https://")) return path;
      const cleanPath = path.startsWith("/") ? path.substring(1) : path;
      return `${API_BASE_URL}/${cleanPath}`;
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setLoading(true);
    try {
      let updatedUser;
      if (user.photoProfile) {
        // Jika sudah ada foto, gunakan update-foto (PUT)
        updatedUser = await UserService.updatedPhotoProfile(user.id, file);
      } else {
        // Jika belum ada foto, gunakan upload-foto (POST)
        const res = await UserService.createPhotoProfile(file);
        updatedUser = { ...user, photoProfile: res.photoProfile };
      }
      setUser(updatedUser);
      alert("Foto profil berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal memperbarui foto profil", error);
      alert("Gagal memperbarui foto profil");
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoDelete = async () => {
    if (!user) return;
    if (!user.photoProfile) {
      alert("Anda belum memiliki foto profil");
      return;
    }

    if (!window.confirm("Apakah Anda yakin ingin menghapus foto profil?")) return;

    setLoading(true);
    try {
      const updatedUser = await UserService.deletePhotoProfile(user.id);
      setUser(updatedUser);
      alert("Foto profil berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus foto profil", error);
      alert("Gagal menghapus foto profil");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    
    if (!username.trim()) {
      alert("Username tidak boleh kosong");
      return;
    }
    if (!email.trim()) {
      alert("Email tidak boleh kosong");
      return;
    }

    setLoading(true);
    try {
      const updateData: { username: string; email: string; password?: string } = {
        username,
        email,
      };
      
      if (password.trim()) {
        updateData.password = password;
      }

      const updatedUser = await UserService.updateUser(user.id, updateData);
      setUser(updatedUser);
      setPassword(""); // Reset password
      alert("Data profil berhasil diperbarui!");
    } catch (error: any) {
      console.error("Gagal memperbarui data profil", error);
      alert(error.response?.data?.detail || "Gagal memperbarui data profil");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setPassword("");
    }
  };

  if (loading) {
    return ( 
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#572B18]"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">Pengaturan</h1>
        <p className="text-neutral-500 text-sm font-normal font-['Inter']">Konfigurasi profile, keamanan, dan pengaturan sistem Pinang AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Quick settings menu */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex flex-col gap-1.5 h-fit">
          <button className="w-full px-4 py-2.5 bg-emerald-100 text-[#572B18] font-semibold rounded-lg text-sm text-left transition-colors">
            Profile Admin
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 bg-red-400 hover:bg-red-500 text-white font-medium rounded-lg text-sm text-left transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
        
        <div>
        {/* Right column: Form details */}
        {user && ( 
          <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 shadow-sm p-6 flex flex-col gap-6">
            <h2 className="text-zinc-900 text-xl font-semibold border-b border-zinc-100 pb-4">
              Informasi Profil Admin
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center border-b border-zinc-100 pb-4">
                <div className="w-16 h-16 bg-zinc-200 rounded-full overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" src={getImageUrl(user.photoProfile)} alt="Avatar" />
                </div>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    onClick={triggerFileInput}
                    className="px-4 py-1.5 bg-[#572B18] hover:bg-[#3D1E11] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    Ganti Foto
                  </button>
                  <button
                    onClick={handlePhotoDelete}
                    className="px-4 py-1.5 border border-stone-300 rounded-lg text-zinc-900 hover:bg-zinc-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-neutral-700 text-xs font-semibold">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-stone-300 rounded-lg text-sm text-zinc-900 outline-none w-full focus:bg-white focus:border-stone-400 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-neutral-700 text-xs font-semibold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 bg-gray-50 border border-stone-300 rounded-lg text-sm text-zinc-900 outline-none w-full focus:bg-white focus:border-stone-400 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-neutral-700 text-xs font-semibold">Password Baru (Kosongkan jika tidak ingin diubah)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="px-4 py-2 bg-gray-50 border border-stone-300 rounded-lg text-sm text-zinc-900 outline-none w-full focus:bg-white focus:border-stone-400 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-neutral-700 text-xs font-semibold">Role</label>
                <input
                  type="text"
                  value={user.role}
                  disabled
                  className="px-4 py-2 bg-zinc-100 border border-stone-300 rounded-lg text-sm text-neutral-500 outline-none w-full cursor-not-allowed"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4 border-t border-zinc-100 pt-4">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 border border-stone-300 rounded-lg text-zinc-900 hover:bg-zinc-50 text-sm font-medium transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-5 py-2 bg-[#572B18] hover:bg-[#3D1E11] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}