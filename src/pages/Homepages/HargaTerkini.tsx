import { useEffect, useState } from "react";
import type { Harga } from "../../interface/Harga";
import { HargaService } from "../../services/hargaService";
export default function HargaTerkini() {

  const [harga, setHarga] = useState<Harga[]>([]);
  const [loading, setLoading] = useState(false);

  const HandleHarga = async () => {
    setLoading(true);
    try {
      const response = await HargaService.GetAllHarga();
      setHarga(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("gagal mengambil data harga", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    HandleHarga();
  }, []); 

  if(loading){
    return(
      <div className="items-center justify-center">
        <div className="animate-spin"></div>
      </div>
    )
  }

  return (
    <section id="harga" className="w-full py-20 bg-zinc-55 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-[#572B18] text-sm uppercase tracking-widest font-bold">Harga Acuan Hari Ini</h2>
          <p className="text-zinc-900 text-3xl font-extrabold tracking-tight">Kalkulasi Transparan Berdasarkan Standar Pasar</p>
          <p className="text-neutral-500 text-sm max-w-xl mx-auto">
            Data diperbarui secara berkala berdasarkan harga rata-rata pasar domestik dan ekspor.
          </p>
        </div>

        {/* Grades Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
          {harga.map((item) => {
            const gradeLower = item.grade.toLowerCase();
            let borderClass = "border-stone-200";
            let badgeClass = "bg-stone-50 text-stone-700 border-stone-200";
            
            if (gradeLower.includes("a") || gradeLower.includes("super")) {
              borderClass = "border-emerald-500/35";
              badgeClass = "bg-emerald-50 text-emerald-800 border-emerald-100";
            } else if (gradeLower.includes("b") || gradeLower.includes("standar")) {
              borderClass = "border-amber-500/35";
              badgeClass = "bg-amber-50 text-amber-800 border-amber-100";
            } else if (gradeLower.includes("c") || gradeLower.includes("sortir")) {
              borderClass = "border-rose-500/35";
              badgeClass = "bg-rose-50 text-rose-800 border-rose-100";
            }

            return (
              <div key={item.id} className={`p-8 bg-white rounded-2xl shadow-sm border ${borderClass} flex flex-col justify-between gap-6 hover:shadow-md transition-shadow relative overflow-hidden`}>
                <div className="flex flex-col gap-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full w-fit border ${badgeClass}`}>
                   Grade {item.grade}
                  </span>
                  
                  <div className="flex flex-col gap-1.5">
                    <span className="text-neutral-500 text-xs uppercase tracking-wider font-semibold">Harga per KG</span>
                    <span className="text-emerald-950 text-3xl font-extrabold">
                      Rp {Number(item.harga).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-stone-150" />

                <p className="text-neutral-600 text-sm text-left leading-relaxed">
                  {item.keterangan || "Spesifikasi tidak dicantumkan."}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}