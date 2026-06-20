export default function Tantangan() {
  return (
    <section id="tantangan" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <h2 className="text-[#572B18] text-sm uppercase tracking-widest font-bold font-['Inter']">
            Tantangan & Solusi
          </h2>
          <p className="text-zinc-900 text-3xl md:text-4xl font-extrabold tracking-tight">
            Grading Manual Lambat dan Tidak Konsisten
          </p>
          <p className="text-neutral-500 text-base md:text-lg leading-relaxed">
            Metode konvensional seringkali subjektif dan memakan waktu, menyebabkan kerugian baik bagi petani maupun pengepul.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
          {/* Masalah Card */}
          <div className="p-8 bg-rose-50/50 rounded-2xl border border-rose-100 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white font-bold text-lg">✕</span>
              <h3 className="text-rose-900 text-lg font-bold">Masalah Manual</h3>
            </div>
            
            <ul className="flex flex-col gap-4 text-neutral-600 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="text-rose-600 font-bold text-lg leading-none">•</span>
                <span>Subjektivitas tinggi antar grader (sering terjadi sengketa grade)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-600 font-bold text-lg leading-none">•</span>
                <span>Sulit menentukan kadar air secara akurat tanpa alat lab mahal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-600 font-bold text-lg leading-none">•</span>
                <span>Antrean panjang saat musim panen raya karena proses yang lambat</span>
              </li>
            </ul>
          </div>

          {/* Solusi Card */}
          <div className="p-8 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold text-lg">✓</span>
              <h3 className="text-emerald-950 text-lg font-bold">Solusi PinangCek</h3>
            </div>
            
            <ul className="flex flex-col gap-4 text-neutral-600 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="text-emerald-700 font-bold text-lg leading-none">•</span>
                <span>Standar grading digital terpadu secara objektif</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-700 font-bold text-lg leading-none">•</span>
                <span>Deteksi sensorik optikal instan menggunakan AI vision</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-700 font-bold text-lg leading-none">•</span>
                <span>Proses grading selesai hanya dalam waktu &lt; 5 detik</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
