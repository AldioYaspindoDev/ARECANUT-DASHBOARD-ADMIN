export default function ScrollComponents() {
  const stats = [
    "Digunakan Banyak Koperasi",
    "Efisiensi Waktu Inspeksi",
    "Cocok digunakan di Wilayah Sumatera",
    "Akurasi Lab-Grade 90%+",
    "Analisis Cepat & Objektif < 5 Detik"
  ];

  // Duplicate list to achieve seamless loop animation
  const doubledStats = [...stats, ...stats];

  return (
    <section className="w-full bg-zinc-900 border-t border-b border-stone-850 py-5 overflow-hidden relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Fade overlay gradients on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-900 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max">
        <div className="flex gap-16 px-8 animate-marquee whitespace-nowrap">
          {doubledStats.map((text, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all cursor-default">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-zinc-200 text-sm md:text-base font-semibold font-['Inter'] tracking-wide">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
