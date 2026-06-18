import { useEffect, useState } from "react";
import type { Article } from "../../interface/Article";
import { ArticleService } from "../../services/articleService";
import { API_BASE_URL } from "../../utils/constants";
import { FaSearch } from "react-icons/fa";

export default function Blogs() {
  const getImageUrl = (path?: string) => {
    if (!path) return "https://placehold.co/80x80?text=No+Image";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
  };

  const [article, setArticle] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Form Fields
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const getArticle = async () => {
    setLoading(true);
    try {
      const response = await ArticleService.GetAllService();
      setArticle(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Gagal Mendapatkan data Article:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  const openAddModal = () => {
    setIsEditMode(false);
    setSelectedId(null);
    setJudul("");
    setIsi("");
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Article) => {
    setIsEditMode(true);
    setSelectedId(item.id);
    setJudul(item.judul);
    setIsi(item.isi);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, judulArticle: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus artikel "${judulArticle}"?`)) {
      try {
        await ArticleService.DeleteService(id);
        alert("Artikel berhasil dihapus!");
        getArticle();
      } catch (error) {
        console.error("Gagal menghapus artikel:", error);
        alert("Gagal menghapus artikel. Pastikan Anda memiliki hak akses admin.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !isi) {
      alert("Judul dan isi artikel wajib diisi!");
      return;
    }

    try {
      if (isEditMode && selectedId) {
        // Update API
        await ArticleService.UpdateService(selectedId, {
          judul,
          isi,
        });
        alert("Artikel berhasil diperbarui!");
      } else {
        // Create API using Form Data
        const formData = new FormData();
        formData.append("judul", judul);
        formData.append("isi", isi);
        if (imageFile) {
          formData.append("file", imageFile);
        }
        await ArticleService.CreateService(formData);
        alert("Artikel baru berhasil ditambahkan!");
      }
      setIsModalOpen(false);
      getArticle();
    } catch (error) {
      console.error("Gagal menyimpan artikel:", error);
      alert("Gagal menyimpan artikel. Pastikan Anda memiliki hak akses admin.");
    }
  };

  const filteredArticles = article.filter((a) =>
    a.judul.toLowerCase().includes(search.toLowerCase()) ||
    a.isi.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#572B18]"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">Manajemen Artikel</h1>
          <p className="text-neutral-500 text-sm font-normal font-['Inter'] mt-1">Kelola konten edukasi dan informasi untuk pengguna aplikasi Pinang AI.</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-5 py-2.5 bg-[#572B18] hover:bg-[#3D1E11] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span className="text-base font-bold">+</span>
          <span>Buat Artikel Baru</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari judul artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-100 rounded-lg border border-transparent focus:border-stone-300 focus:bg-white outline-none text-sm font-['Inter'] transition-colors"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4  flex items-center justify-center">
            <FaSearch/>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-stone-200">
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">ID Artikel</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Judul Artikel</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Isi</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Penulis</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Tanggal Publikasi</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-neutral-500 text-sm">
                    Tidak ada artikel ditemukan
                  </td>
                </tr>
              ) : (
                filteredArticles.map((a) => (
                  <tr key={a.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 text-[#572B18] text-sm font-semibold font-mono">{a.id.substring(0, 8)}...</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          className="w-10 h-6 sm:w-12 sm:h-8 rounded object-cover border border-stone-200 bg-stone-100" 
                          src={getImageUrl(a.gambar)} 
                          alt={a.judul} 
                        />
                        <div className="max-w-xs text-zinc-900 text-sm font-medium truncate" title={a.judul}>
                          {a.judul}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md text-neutral-500 text-sm truncate" title={a.isi}>
                        {a.isi}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img 
                          className="w-6 h-6 rounded-full object-cover border border-stone-200 bg-stone-50" 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(a.username || a.user_id)}&background=572B18&color=fff`} 
                          alt={a.username || a.user_id} 
                        />
                        <span className="text-zinc-900 text-sm">{a.username || "Admin"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 text-sm">
                      {new Date(a.tanggal || new Date()).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(a)}
                          className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-neutral-700 rounded-md transition-colors text-xs font-medium cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(a.id, a.judul)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md transition-colors text-xs font-medium cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-lg overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <h3 className="text-lg font-semibold text-zinc-900">
                {isEditMode ? "Edit Artikel" : "Buat Artikel Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-600">Judul Artikel</label>
                <input
                  type="text"
                  placeholder="Masukkan judul artikel"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="px-3.5 py-2 border border-stone-300 rounded-lg text-sm outline-none focus:border-[#572B18]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-600">Isi Artikel</label>
                <textarea
                  placeholder="Tulis artikel di sini (minimal 20 karakter)..."
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  className="px-3.5 py-2 border border-stone-300 rounded-lg text-sm outline-none focus:border-[#572B18] h-40 resize-none"
                />
              </div>

              {!isEditMode && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-neutral-600">Gambar Artikel</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="text-xs text-neutral-600 border border-stone-300 rounded-lg p-2 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#FFF3ED] file:text-[#572B18] file:cursor-pointer"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-neutral-700 hover:bg-stone-50 text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#572B18] hover:bg-[#3D1E11] text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  {isEditMode ? "Perbarui" : "Publikasikan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}