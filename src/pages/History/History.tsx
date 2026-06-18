import { useEffect, useState } from "react";
import { HistoryService } from "../../services/historyService";
import { FaSearch } from "react-icons/fa";

interface HistoryData {
  id: string;
  user_id: string;
  pinang_id: string;
  grade: string;
  harga_per_kg: string;
  keterangan_harga: string;
  lokasi?: string;
  perangkat?: string;
  catatan?: string;
  created_at: string;
}

export default function History() {
  const [historyList, setHistoryList] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getHistory = async () => {
    setLoading(true);
    try {
      const response = await HistoryService.GetAllHistory();
      setHistoryList(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Gagal mengambil riwayat deteksi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const getBgGradeClass = (grade: string) => {
    const normalized = grade.toLowerCase();
    if (normalized.includes('a')) return 'bg-emerald-600 text-white';
    if (normalized.includes('b')) return 'bg-amber-500 text-white';
    if (normalized.includes('c')) return 'bg-rose-500 text-white';
    return 'bg-zinc-600 text-white';
  };

  const filteredHistory = historyList.filter((item) =>
    item.id.toLowerCase().includes(search.toLowerCase()) ||
    item.user_id.toLowerCase().includes(search.toLowerCase()) ||
    item.grade.toLowerCase().includes(search.toLowerCase()) ||
    (item.lokasi && item.lokasi.toLowerCase().includes(search.toLowerCase()))
  );

  const handleExportCSV = () => {
    if (filteredHistory.length === 0) return;
    const headers = ["ID History", "User ID", "Pinang ID", "Grade", "Harga per KG", "Lokasi", "Perangkat", "Catatan", "Waktu"];
    const rows = filteredHistory.map((item) => [
      item.id,
      item.user_id,
      item.pinang_id,
      item.grade,
      item.harga_per_kg,
      item.lokasi || "",
      item.perangkat || "",
      item.catatan || "",
      item.created_at,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map(val => `"${val}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `riwayat_deteksi_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">Riwayat Deteksi Global</h1>
          <p className="text-neutral-500 text-sm font-normal font-['Inter'] mt-1">Pantau log aktivitas klasifikasi kualitas pinang dari seluruh pengguna terdaftar.</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-5 py-2.5 bg-[#572B18] hover:bg-[#3D1E11] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span className="text-base font-bold">⬇</span>
          <span>Export Data (CSV)</span>
        </button>
      </div>

      {/* Filter / Search section */}
      <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari ID, User ID, Grade, atau Lokasi..."
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
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">ID History</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">User ID</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Info Scan</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Lokasi / Perangkat</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Waktu Deteksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-neutral-500 text-sm">
                    Tidak ada riwayat deteksi ditemukan
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 text-neutral-550 text-sm font-mono">{item.id.substring(0, 8)}...</td>
                    <td className="px-6 py-4 text-neutral-600 text-sm font-mono">{item.user_id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-center w-fit ${getBgGradeClass(item.grade)}`}>
                          Grade {item.grade}
                        </span>
                        <span className="text-zinc-900 text-xs font-semibold">Rp {item.harga_per_kg}/kg</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-zinc-900 text-xs font-medium">{item.lokasi || "-"}</span>
                        <span className="text-neutral-500 text-[10px]">{item.perangkat || "-"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 text-sm">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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