export default function Unggulan() {
  const features = [
    { title: "Deteksi Grade", desc: "Mendeteksi kualitas super hingga sortir secara otomatis." },
    { title: "Estimasi Kekeringan", desc: "Membantu menafsirkan kadar air biji pinang secara visual." },
    { title: "Harga Acuan", desc: "Menghubungkan langsung grade dengan estimasi harga pasar." },
    { title: "Riwayat", desc: "Menyimpan seluruh log pemindaian untuk pelacakan transaksi." }
  ];

  return (
    <section id="unggulan" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-[#572B18] text-sm uppercase tracking-widest font-bold">Fitur Unggulan</h2>
          <p className="text-zinc-900 text-3xl font-extrabold tracking-tight">Teknologi Mutakhir Untuk Petani</p>
        </div>

        {/* Features Tabs/Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="px-6 py-2.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-100 font-semibold text-sm transition-colors hover:bg-emerald-100 cursor-default">
              {feature.title}
            </div>
          ))}
        </div>

        {/* Feature Detail Highlight */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 lg:p-12 shadow-xl border border-emerald-900 flex flex-col lg:flex-row justify-between items-center gap-12 max-w-5xl mx-auto w-full">
          <div className="flex-1 flex flex-col gap-6 text-left">
            <h3 className="text-2xl lg:text-3xl font-bold">Akurasi Grade Otomatis</h3>
            <p className="text-emerald-100 text-sm lg:text-base leading-relaxed">
              Algoritma visi komputer kami dilatih pada ratusan ribu data untuk membedakan Pinang Super (Grade A) hingga Pinang Sortir (Grade C) dengan presisi tinggi tanpa bias manusia.
            </p>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
                <span className="text-sm font-medium">Standar industri terintegrasi</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
                <span className="text-sm font-medium">Penilaian instan dan tanpa bias manusia</span>
              </div>
            </div>
          </div>

          {/* Interactive Screen Simulation */}
          <div className="flex-1 w-full max-w-sm p-6 bg-white rounded-2xl border border-stone-200 text-zinc-900 shadow-lg flex flex-col gap-4">
            <div className="pb-3 border-b border-stone-150 flex justify-between items-center">
              <h4 className="text-emerald-950 font-bold">Analisis Real-time</h4>
              <span className="text-neutral-500 text-xs">0.3s Processing</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Tekstur Biji Pinang</span>
                  <span className="text-emerald-700">Keras (Padat)</span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="w-[90%] h-full bg-emerald-700 rounded-full" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Pola Warna Citra</span>
                  <span className="text-emerald-700">Coklat Terang (Optimal)</span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-emerald-700 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}