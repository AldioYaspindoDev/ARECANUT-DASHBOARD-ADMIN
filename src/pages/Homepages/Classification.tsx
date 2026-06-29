import { ClassificationData } from "../../data/ClassificationData";

export default function Classification() {
  // Mapping detail tambahan untuk memperkaya visual dan informasi setiap kelas/grade
  const extraDetails: Record<string, {
    moisture: string;
    integrity: string;
    standardUse: string;
    colorTheme: {
      border: string;
      badge: string;
      accent: string;
      bg: string;
      text: string;
    }
  }> = {
    "a": {
      moisture: "< 12%",
      integrity: "95% - 100% Utuh & Bulat",
      standardUse: "Ekspor, Farmasi, Kosmetik Premium",
      colorTheme: {
        border: "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-emerald-500/5",
        badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
        accent: "text-emerald-700",
        bg: "bg-emerald-50/30",
        text: "text-emerald-950"
      }
    },
    "b": {
      moisture: "12% - 18%",
      integrity: "70% - 90% Utuh (sedikit belah)",
      standardUse: "Pasar Domestik, Industri Makanan",
      colorTheme: {
        border: "border-amber-500/20 hover:border-amber-500/50 hover:shadow-amber-500/5",
        badge: "bg-amber-50 text-amber-800 border-amber-200",
        accent: "text-amber-700",
        bg: "bg-amber-50/30",
        text: "text-amber-950"
      }
    },
    "c": {
      moisture: "> 18%",
      integrity: "< 70% (Pecah & sebagian cacat)",
      standardUse: "Pengolahan Kimia Rendah, Sortiran Pasar",
      colorTheme: {
        border: "border-rose-500/20 hover:border-rose-500/50 hover:shadow-rose-500/5",
        badge: "bg-rose-50 text-rose-800 border-rose-200",
        accent: "text-rose-700",
        bg: "bg-rose-50/30",
        text: "text-rose-950"
      }
    }
  };

  return (
    <section id="unggulan" className="w-full py-24 bg-gradient-to-b from-stone-50 to-white border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
        {/* Header */}
        <div className="text-center flex flex-col gap-4 max-w-2xl mx-auto">
          <h2 className="text-[#572B18] text-xs uppercase tracking-widest font-extrabold">Standar Kualitas</h2>
          <p className="text-zinc-900 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Kelas Klasifikasi Biji Pinang
          </p>
          <p className="text-neutral-500 text-base leading-relaxed">
            Sistem cerdas kami membagi biji pinang menjadi 3 kelas utama berdasarkan standar industri dan pasar internasional untuk transparansi penilaian.
          </p>
        </div>

        {/* Grades Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {Object.values(ClassificationData).map((item, index) => {
            const gradeKey = item.gradeClass.toLowerCase();
            const detail = extraDetails[gradeKey] || extraDetails["a"];
            const theme = detail.colorTheme;

            return (
              <div 
                key={index} 
                className={`group flex flex-col justify-between bg-white rounded-3xl border ${theme.border} p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative`}
              >
                {/* Header Card */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1.5 text-xs font-bold rounded-full border ${theme.badge} uppercase tracking-wider`}>
                      Grade {item.gradeClass}
                    </span>
                    <span className="text-stone-300 text-xs font-semibold">Kelas #{index + 1}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-neutral-400 text-xs uppercase tracking-widest font-bold">Nama Varietas / Kelas</span>
                    <h3 className="text-zinc-900 text-2xl font-extrabold tracking-tight group-hover:text-[#572B18] transition-colors">
                      Pinang {item.nameClass}
                    </h3>
                  </div>
                </div>

                {/* Image Container with premium frame & hover zoom */}
                <div className="my-6 aspect-[4/3] w-full rounded-2xl overflow-hidden border border-stone-150 bg-stone-50 shadow-inner relative">
                  <img 
                    src={item.image} 
                    alt={`Pinang ${item.nameClass}`} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold tracking-wide">Sampel Visual Pinang {item.nameClass}</span>
                  </div>
                </div>

                {/* Spesifikasi Detail */}
                <div className="flex flex-col gap-4 mb-6">
                  <div className="h-px bg-stone-100" />
                  
                  {/* Parameter Lists */}
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500 font-medium">Kadar Air</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${theme.badge}`}>{detail.moisture}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500 font-medium">Keutuhan Biji</span>
                      <span className="text-zinc-800 font-semibold">{detail.integrity}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500 font-medium">Peruntukan Pasar</span>
                      <span className="text-zinc-800 font-semibold text-right text-xs max-w-[170px] leading-tight">{detail.standardUse}</span>
                    </div>
                  </div>

                  <div className="h-px bg-stone-100" />
                </div>

                {/* Deskripsi */}
                <div className={`${theme.bg} rounded-2xl p-4 border border-stone-100/50`}>
                  <p className="text-neutral-700 text-sm leading-relaxed text-left">
                    <strong className={`${theme.accent} font-bold block mb-1`}>Karakteristik Utama:</strong>
                    {item.description || "Spesifikasi tidak dicantumkan."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}