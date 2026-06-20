import { useEffect, useState } from "react";
import { HargaService } from "../../services/hargaService";
import type { Harga } from "../../interface/Harga";

export default function Prices() {
  const getBgGradeClass = (grade: string) => {
    const normalized = grade.toLowerCase();
    if (normalized.includes('a')) return 'bg-emerald-600 text-white';
    if (normalized.includes('b')) return 'bg-amber-500 text-white';
    if (normalized.includes('c')) return 'bg-rose-500 text-white';
    return 'bg-zinc-500 text-white';
  };

  const [harga, setHarga] = useState<Harga[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Form Fields
  const [grade, setGrade] = useState("");
  const [priceVal, setPriceVal] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const getHarga = async () => {
    setLoading(true);
    try {
      const response = await HargaService.GetAllHarga();
      setHarga(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Gagal mengambil data harga:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHarga();
  }, []);

  const openAddModal = () => {
    setIsEditMode(false);
    setSelectedId(null);
    setGrade("");
    setPriceVal("");
    setKeterangan("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: Harga) => {
    setIsEditMode(true);
    setSelectedId(item.id || null);
    setGrade(item.grade);
    setPriceVal(item.harga);
    setKeterangan(item.keterangan || "");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, gradeName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data acuan harga untuk Grade ${gradeName}?`)) {
      try {
        await HargaService.DeleteHarga(id);
        alert("Data acuan harga berhasil dihapus!");
        getHarga();
      } catch (error) {
        console.error("Gagal menghapus harga:", error);
        alert("Gagal menghapus acuan harga. Pastikan Anda memiliki hak akses admin.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grade || !priceVal) {
      alert("Grade dan Harga wajib diisi!");
      return;
    }

    try {
      if (isEditMode && selectedId) {
        await HargaService.UpdateHarga(selectedId, {
          harga: priceVal,
          keterangan,
        });
        alert("Harga acuan berhasil diperbarui!");
      } else {
        await HargaService.CreateHarga({
          grade,
          harga: priceVal,
          keterangan,
        });
        alert("Harga acuan baru berhasil ditambahkan!");
      }
      setIsModalOpen(false);
      getHarga();
    } catch (error) {
      console.error("Gagal menyimpan harga:", error);
      alert("Gagal menyimpan data harga. Pastikan Anda memiliki hak akses admin dan grade belum terdaftar.");
    }
  };

  const filteredHarga = harga.filter((h) =>
    h.grade.toLowerCase().includes(search.toLowerCase()) ||
    (h.keterangan && h.keterangan.toLowerCase().includes(search.toLowerCase()))
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
          <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">Manajemen Harga Acuan</h1>
          <p className="text-neutral-500 text-sm font-normal font-['Inter'] mt-1">Atur harga acuan biji pinang berdasarkan grade kualitas.</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-5 py-2.5 bg-[#572B18] hover:bg-[#3D1E11] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span className="text-base font-bold">+</span>
          <span>Update / Tambah Harga</span>
        </button>
      </div>

      {/* Grid of Current Prices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {harga.map((h) => (
          <div key={h.grade} className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-center">
              <span className={`px-2.5 py-1 rounded text-xs font-semibold ${getBgGradeClass(h.grade)}`}>
                Grade {h.grade}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">HARGA ACUAN SAAT INI</span>
              <div className="flex items-baseline gap-1">
                <span className="text-zinc-900 text-3xl font-bold font-['Inter'] leading-9">Rp {h.harga}</span>
                <span className="text-neutral-500 text-sm">/ kg</span>
              </div>
              {h.keterangan && <span className="text-xs text-neutral-600 mt-1">{h.keterangan}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-zinc-900 text-xl font-semibold font-['Inter'] leading-7">Daftar Harga Acuan</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-stone-200">
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Grade</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Harga per KG</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Keterangan</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150">
              {filteredHarga.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-500 text-sm">
                    Tidak ada acuan harga ditemukan
                  </td>
                </tr>
              ) : (
                filteredHarga.map((h) => (
                  <tr key={h.grade} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded text-xs font-semibold ${getBgGradeClass(h.grade)}`}>
                        {h.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-900 text-sm font-semibold">Rp {h.harga}</td>
                    <td className="px-6 py-4 text-neutral-600 text-sm">{h.keterangan}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(h)}
                          className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-neutral-700 rounded-md transition-colors text-xs font-medium cursor-pointer"
                        >
                          Edit
                        </button>
                        {h.id && (
                          <button
                            onClick={() => handleDelete(h.id!, h.grade)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md transition-colors text-xs font-medium cursor-pointer"
                          >
                            Hapus
                          </button>
                        )}
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
          <div className="bg-white rounded-xl max-w-md w-full shadow-lg overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <h3 className="text-lg font-semibold text-zinc-900">
                {isEditMode ? `Edit Harga Grade ${grade}` : "Tambah Acuan Harga Baru"}
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
                <label className="text-xs font-semibold text-neutral-600">Grade Pinang</label>
                <input
                  type="text"
                  placeholder="Contoh: A, B, atau C"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value.toUpperCase())}
                  disabled={isEditMode}
                  className="px-3.5 py-2 border border-stone-300 rounded-lg text-sm outline-none focus:border-[#572B18] disabled:bg-stone-100 disabled:text-neutral-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-600">Harga Acuan (Rp per KG)</label>
                <input
                  type="number"
                  placeholder="Contoh: 12000"
                  value={priceVal}
                  onChange={(e) => setPriceVal(e.target.value)}
                  className="px-3.5 py-2 border border-stone-300 rounded-lg text-sm outline-none focus:border-[#572B18]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-600">Keterangan</label>
                <textarea
                  placeholder="Keterangan mengenai harga ini..."
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="px-3.5 py-2 border border-stone-300 rounded-lg text-sm outline-none focus:border-[#572B18] h-24 resize-none"
                />
              </div>

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
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}