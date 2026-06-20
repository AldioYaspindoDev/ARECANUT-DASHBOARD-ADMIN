import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { IoLeaf } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { UserService } from "../../services/userService";
import { PinangService } from "../../services/pinangService";
import { ArticleService } from "../../services/articleService";
import { HistoryService } from "../../services/historyService";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPinang: 0,
    totalArticles: 0,
    historyToday: 0,
  });
  const [recentHistory, setRecentHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [users, pinangList, articles, historyList] = await Promise.all([
        UserService.GetAllUser(0, 100).catch(() => []),
        PinangService.GetAllPinang(0, 100).catch(() => []),
        ArticleService.GetAllService(0, 100).catch(() => []),
        HistoryService.GetAllHistory(0, 100).catch(() => []),
      ]);

      const totalUsers = Array.isArray(users) ? users.length : 0;
      const totalPinang = Array.isArray(pinangList) ? pinangList.length : 0;
      const totalArticles = Array.isArray(articles) ? articles.length : 0;
      
      const todayStr = new Date().toDateString();
      const historyToday = Array.isArray(historyList) 
        ? historyList.filter((h: any) => new Date(h.created_at).toDateString() === todayStr).length
        : 0;

      setStats({
        totalUsers,
        totalPinang,
        totalArticles,
        historyToday,
      });

      if (Array.isArray(historyList)) {
        const sorted = [...historyList].sort((a: any, b: any) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setRecentHistory(sorted.slice(0, 5));
      }
    } catch (error) {
      console.error("Gagal memuat data dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const OverviewData = [
    {
      iconData: FaUser,
      judulData: "TOTAL USER",
      totalData: loading ? "..." : stats.totalUsers.toLocaleString("id-ID"),
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      path: '/users'
    },
    {
      iconData: IoLeaf,
      judulData: "TOTAL PINANG TERDETEKSI",
      totalData: loading ? "..." : stats.totalPinang.toLocaleString("id-ID"),
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      path: '/pinang-data'
    },
    {
      iconData: MdLibraryBooks,
      judulData: "ARTIKEL PUBLIK",
      totalData: loading ? "..." : stats.totalArticles.toLocaleString("id-ID"),
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      path: '/articles'
    },
    {
      iconData: FaHistory,
      judulData: "RIWAYAT DETEKSI HARI INI",
      totalData: loading ? "..." : stats.historyToday.toLocaleString("id-ID"),
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
      path: '/history'
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Page Title & Action */}
      <div className="flex flex-col  sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">
            Dashboard Overview
          </h1>
          <p className="text-neutral-700 text-base font-normal font-['Inter'] leading-6">
            Ringkasan cepat kondisi sistem Pinang AI hari ini.
          </p>
        </div>
        
      </div>

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {OverviewData.map((item, idx) => {
          const Icon = item.iconData;
          return (
            <NavLink to={item.path}>
            <div key={idx} className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <div className={`w-10 h-10 ${item.iconBg} ${item.iconColor} rounded-lg flex justify-center items-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="pt-2 flex flex-col">
                <span className="text-neutral-500 text-[10px] font-bold font-['Inter'] uppercase tracking-wider">
                  {item.judulData}
                </span>
                <span className="text-zinc-900 text-3xl font-bold font-['Inter'] leading-10 mt-1">
                  {item.totalData}
                </span>
              </div>
            </div>
            </NavLink>
          );
        })}
      </div>

      {/* Grid Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column Left: Chart */}
        <div className="lg:col-span-2 p-6 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <h2 className="text-zinc-900 text-xl font-semibold font-['Inter'] leading-7">
                Statistik Deteksi Mingguan
              </h2>
              <p className="text-neutral-500 text-xs font-normal">Aktivitas klasifikasi kualitas pinang selama 7 hari terakhir.</p>
            </div>
          </div>
          
          {/* Chart Wrapper */}
          <div className="h-64 relative overflow-hidden border-t border-zinc-100 pt-4">
            <div className="w-full h-0 top-[50px] absolute border-t border-zinc-100/70" />
            <div className="w-full h-0 top-[100px] absolute border-t border-zinc-100/70" />
            <div className="w-full h-0 top-[150px] absolute border-t border-zinc-100/70" />
            <div className="w-full h-0 top-[200px] absolute border-t border-zinc-100/70" />
            
            {/* Mock chart visualization using Tailwind flex values */}
            <div className="absolute inset-x-0 bottom-8 top-4 flex justify-between items-end px-4">
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3.5 bg-gradient-to-t from-[#9B6751] to-[#572B18] rounded-t-md h-28 hover:opacity-90 transition-opacity" />
                <span className="text-neutral-500 text-xs">Sen</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3.5 bg-gradient-to-t from-[#9B6751] to-[#572B18] rounded-t-md h-16 hover:opacity-90 transition-opacity" />
                <span className="text-neutral-500 text-xs">Sel</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3.5 bg-gradient-to-t from-[#9B6751] to-[#572B18] rounded-t-md h-36 hover:opacity-90 transition-opacity" />
                <span className="text-neutral-500 text-xs">Rab</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3.5 bg-gradient-to-t from-[#9B6751] to-[#572B18] rounded-t-md h-24 hover:opacity-90 transition-opacity" />
                <span className="text-neutral-500 text-xs">Kam</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3.5 bg-gradient-to-t from-[#9B6751] to-[#572B18] rounded-t-md h-40 hover:opacity-90 transition-opacity" />
                <span className="text-neutral-500 text-xs">Jum</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3.5 bg-gradient-to-t from-[#9B6751] to-[#572B18] rounded-t-md h-32 hover:opacity-90 transition-opacity" />
                <span className="text-neutral-500 text-xs">Sab</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3.5 bg-gradient-to-t from-[#9B6751] to-[#572B18] rounded-t-md h-48 hover:opacity-90 transition-opacity" />
                <span className="text-neutral-500 text-xs">Min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column Right: Recent Activity Table */}
        <div className="lg:col-span-1 p-6 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-zinc-900 text-xl font-semibold font-['Inter'] leading-7">
              5 Deteksi Terbaru
            </h2>
            <button 
              onClick={() => navigate("/history")}
              className="text-[#572B18] text-xs font-semibold font-['Inter'] hover:underline cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>

          <div className="flex flex-col divide-y divide-stone-100 overflow-x-auto">
            {/* Table Header */}
            <div className="flex justify-between pb-3 text-neutral-500 text-xs font-medium font-['Inter'] uppercase tracking-wider">
              <span className="w-24 text-left">PINANG ID</span>
              <span className="w-20 text-left">GRADE</span>
              <span className="w-20 text-right">TANGGAL</span>
            </div>

            {loading ? (
              <div className="py-8 text-center text-neutral-400 text-xs">
                Memuat data...
              </div>
            ) : recentHistory.length === 0 ? (
              <div className="py-8 text-center text-neutral-400 text-xs">
                Belum ada data deteksi
              </div>
            ) : (
              recentHistory.map((item) => {
                const formattedTime = new Date(item.created_at).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                
                const getBgClass = (grade: string) => {
                  const normalized = grade.toLowerCase();
                  if (normalized.includes('a')) return 'bg-emerald-100 text-emerald-800';
                  if (normalized.includes('b')) return 'bg-amber-100 text-amber-800';
                  if (normalized.includes('c')) return 'bg-red-100 text-red-800';
                  return 'bg-zinc-100 text-zinc-800';
                };

                return (
                  <div key={item.id} className="flex justify-between py-3 items-center">
                    <div className="w-24 flex flex-col">
                      <span className="text-zinc-900 text-sm font-medium font-['Inter'] truncate">
                        #{item.pinang_id?.substring(0, 8) || item.id?.substring(0, 8)}
                      </span>
                      <span className="text-neutral-500 text-[10px] truncate" title={item.keterangan_harga || item.catatan}>
                        {item.keterangan_harga || item.catatan || "Deteksi Pinang"}
                      </span>
                    </div>
                    <div className="w-20">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded ${getBgClass(item.grade)}`}>
                        Grade {item.grade}
                      </span>
                    </div>
                    <span className="w-20 text-right text-neutral-600 text-sm">
                      {formattedTime}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
