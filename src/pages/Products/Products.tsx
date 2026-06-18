import { useEffect, useState } from "react";
import { PinangService } from "../../services/pinangService";
import { API_BASE_URL } from "../../utils/constants";

interface PinangItem {
  id: string;
  user_id: string;
  gambar?: string;
  jenis_pinang: string;
  kualitas_pinang: string;
  tingkat_kekeringan: string;
  deskripsi?: string;
  persentase?: string;
  created_at: string;
}

export default function Products() {
  const [pinangList, setPinangList] = useState<PinangItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedGrade, setSelectedGrade] = useState("Semua Grade");
  const [selectedJenis, setSelectedJenis] = useState("Semua Jenis");

  const getPinang = async () => {
    setLoading(true);
    try {
      const response = await PinangService.GetAllPinang();
      setPinangList(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Gagal mengambil data pinang:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPinang();
  }, []);

  const getImageUrl = (path?: string) => {
    if (!path) return "https://placehold.co/80x85?text=No+Image";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
  };

  const getBgGradeClass = (grade: string) => {
    const normalized = grade.toLowerCase();
    if (normalized.includes('a')) return 'bg-[#9B6751] text-white';
    if (normalized.includes('b')) return 'bg-amber-500 text-white';
    if (normalized.includes('c')) return 'bg-red-500 text-white';
    return 'bg-zinc-500 text-white';
  };

  const filteredPinang = pinangList.filter((item) => {
    const matchesGrade =
      selectedGrade === "Semua Grade" ||
      item.kualitas_pinang.toLowerCase() === selectedGrade.replace("Grade ", "").toLowerCase();
    
    const matchesJenis =
      selectedJenis === "Semua Jenis" ||
      item.jenis_pinang.toLowerCase().includes(selectedJenis.toLowerCase());

    return matchesGrade && matchesJenis;
  });

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
      <div className="flex flex-col gap-1">
        <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">
          Data Pinang Terdeteksi
        </h1>
        <p className="text-neutral-500 text-sm font-normal font-['Inter']">
          Memantau hasil deteksi kualitas biji pinang dari seluruh pengguna sistem.
        </p>
      </div>

      {/* Filter Options */}
      <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="text-neutral-700 text-xs font-semibold font-['Inter'] tracking-wide">
              Filter Grade
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-stone-300 rounded-lg text-sm text-zinc-900 outline-none w-full focus:bg-white"
            >
              <option>Semua Grade</option>
              <option>Grade A</option>
              <option>Grade B</option>
              <option>Grade C</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-neutral-700 text-xs font-semibold font-['Inter'] tracking-wide">
              Jenis Pinang
            </label>
            <select
              value={selectedJenis}
              onChange={(e) => setSelectedJenis(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-stone-300 rounded-lg text-sm text-zinc-900 outline-none w-full focus:bg-white"
            >
              <option>Semua Jenis</option>
              <option>Bulat</option>
              <option>Belah</option>
            </select>
          </div>

          <button
            onClick={getPinang}
            className="px-6 py-2.5 bg-[#572B18] hover:bg-[#3D1E11] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors text-center w-full cursor-pointer"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-stone-200">
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Foto</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">ID Pinang</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Jenis</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Grade</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Kekeringan / Deskripsi</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">User Pemilik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150">
              {filteredPinang.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-neutral-500 text-sm">
                    Tidak ada data deteksi pinang ditemukan
                  </td>
                </tr>
              ) : (
                filteredPinang.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <img className="w-10 h-12 rounded object-cover border border-stone-200" src={getImageUrl(item.gambar)} alt={item.id} />
                    </td>
                    <td className="px-6 py-4 text-zinc-900 text-sm font-medium font-mono">{item.id.substring(0, 8)}...</td>
                    <td className="px-6 py-4 text-zinc-900 text-sm">{item.jenis_pinang}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${getBgGradeClass(item.kualitas_pinang)}`}>
                        Grade {item.kualitas_pinang} ({item.persentase || "0%"})
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-zinc-900 text-sm">{item.tingkat_kekeringan}</span>
                        <span className="text-neutral-500 text-xs">{item.deskripsi || "-"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 text-sm">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-zinc-900 text-sm font-mono">{item.user_id}</span>
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