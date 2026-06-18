import { FaUser} from "react-icons/fa6";
import { IoLeaf } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { FaFileExport } from "react-icons/fa6";

export default function Dashboard() {
  const OverviewData = [
    {
      iconData: FaUser,
      judulData: "TOTAL USER",
      totalData: "1,250",
      trend: "+12%",
      iconColor: "text-[#572B18]",
      iconBg: "bg-[#FFF3ED]",
    },
    {
      iconData: IoLeaf,
      judulData: "TOTAL PINANG TERDETEKSI",
      totalData: "45,800",
      trend: "+5%",
      iconColor: "text-[#572B18]",
      iconBg: "bg-[#FFDED0]/50",
    },
    {
      iconData: MdLibraryBooks,
      judulData: "ARTIKEL PUBLIK",
      totalData: "124",
      iconColor: "text-[#9B6751]",
      iconBg: "bg-[#FFF3ED]",
    },
    {
      iconData: FaHistory,
      judulData: "RIWAYAT DETEKSI HARI INI",
      totalData: "850",
      iconColor: "text-rose-900",
      iconBg: "bg-rose-50",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Page Title & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">
            Dashboard Overview
          </h1>
          <p className="text-neutral-700 text-base font-normal font-['Inter'] leading-6">
            Ringkasan cepat kondisi sistem Pinang AI hari ini.
          </p>
        </div>
        <button className="px-4 py-2 rounded-lg border border-stone-300 bg-white flex justify-start items-center gap-2 hover:bg-zinc-50 transition-colors">
          <FaFileExport/>
          <span className="text-zinc-900 text-xs font-semibold font-['Inter'] leading-4 tracking-wide">
            Export
          </span>
        </button>
      </div>

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {OverviewData.map((item, idx) => {
          const Icon = item.iconData;
          return (
            <div key={idx} className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className={`w-10 h-10 ${item.iconBg} ${item.iconColor} rounded-lg flex justify-center items-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                {item.trend && (
                  <div className="px-2 py-1 bg-[#FFF3ED] rounded-md flex justify-start items-center gap-1">
                    <span className="text-[#9B6751] text-xs font-medium font-['Inter'] leading-4">
                      {item.trend}
                    </span>
                  </div>
                )}
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
          );
        })}
      </div>

      {/* Grid Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column Left: Chart */}
        <div className="lg:col-span-2 p-6 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-zinc-900 text-xl font-semibold font-['Inter'] leading-7">
              Aktivitas Deteksi
            </h2>
            <div className="px-3 py-1 bg-gray-50 rounded-md border border-stone-300 text-zinc-900 text-sm font-normal font-['Inter'] cursor-pointer">
              7 Hari Terakhir
            </div>
          </div>
          
          {/* Chart Wrapper */}
          <div className="h-64 relative overflow-hidden border-t border-zinc-100 pt-4">
            <div className="w-full h-0 top-[50px] absolute border-t border-zinc-100" />
            <div className="w-full h-0 top-[100px] absolute border-t border-zinc-100" />
            <div className="w-full h-0 top-[150px] absolute border-t border-zinc-100" />
            <div className="w-full h-0 top-[200px] absolute border-t border-zinc-100" />
            
            {/* Mock chart visualization using Tailwind flex values */}
            <div className="absolute inset-x-0 bottom-8 top-4 flex justify-between items-end px-4">
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3 bg-[#572B18] rounded-t-sm h-28" />
                <span className="text-neutral-500 text-xs">Sen</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3 bg-[#572B18] rounded-t-sm h-16" />
                <span className="text-neutral-500 text-xs">Sel</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3 bg-[#572B18] rounded-t-sm h-36" />
                <span className="text-neutral-500 text-xs">Rab</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3 bg-[#572B18] rounded-t-sm h-24" />
                <span className="text-neutral-500 text-xs">Kam</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3 bg-[#572B18] rounded-t-sm h-40" />
                <span className="text-neutral-500 text-xs">Jum</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3 bg-[#572B18] rounded-t-sm h-32" />
                <span className="text-neutral-500 text-xs">Sab</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-12">
                <div className="w-3 bg-[#572B18] rounded-t-sm h-48" />
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
            <button className="text-[#572B18] text-xs font-semibold font-['Inter'] hover:underline">
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

            {/* Row 1 */}
            <div className="flex justify-between py-3 items-center">
              <div className="w-24 flex flex-col">
                <span className="text-zinc-900 text-sm font-medium font-['Inter']">#PNG-082</span>
                <span className="text-neutral-500 text-xs">Biji Bulat</span>
              </div>
              <div className="w-20">
                <span className="px-2.5 py-0.5 bg-[#FFF3ED] text-[#572B18] text-[10px] font-bold rounded">
                  Grade A
                </span>
              </div>
              <span className="w-20 text-right text-neutral-600 text-sm">10:42</span>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between py-3 items-center">
              <div className="w-24 flex flex-col">
                <span className="text-zinc-900 text-sm font-medium font-['Inter']">#PNG-081</span>
                <span className="text-neutral-500 text-xs">Biji Belah</span>
              </div>
              <div className="w-20">
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                  Grade B
                </span>
              </div>
              <span className="w-20 text-right text-neutral-600 text-sm">09:15</span>
            </div>

            {/* Row 3 */}
            <div className="flex justify-between py-3 items-center">
              <div className="w-24 flex flex-col">
                <span className="text-zinc-900 text-sm font-medium font-['Inter']">#PNG-080</span>
                <span className="text-neutral-500 text-xs">Biji Utuh</span>
              </div>
              <div className="w-20">
                <span className="px-2.5 py-0.5 bg-[#FFF3ED] text-[#572B18] text-[10px] font-bold rounded">
                  Grade A
                </span>
              </div>
              <span className="w-20 text-right text-neutral-600 text-sm">08:30</span>
            </div>

            {/* Row 4 */}
            <div className="flex justify-between py-3 items-center">
              <div className="w-24 flex flex-col">
                <span className="text-zinc-900 text-sm font-medium font-['Inter']">#PNG-079</span>
                <span className="text-neutral-500 text-xs">Biji Belah</span>
              </div>
              <div className="w-20">
                <span className="px-2.5 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded">
                  Grade C
                </span>
              </div>
              <span className="w-20 text-right text-neutral-600 text-sm">Kemarin</span>
            </div>

            {/* Row 5 */}
            <div className="flex justify-between py-3 items-center">
              <div className="w-24 flex flex-col">
                <span className="text-zinc-900 text-sm font-medium font-['Inter']">#PNG-078</span>
                <span className="text-neutral-500 text-xs">Biji Bulat</span>
              </div>
              <div className="w-20">
                <span className="px-2.5 py-0.5 bg-[#FFF3ED] text-[#572B18] text-[10px] font-bold rounded">
                  Grade A
                </span>
              </div>
              <span className="w-20 text-right text-neutral-600 text-sm">Kemarin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
