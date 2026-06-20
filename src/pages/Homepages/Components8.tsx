export default function Components8() {
  const testimonials = [
    {
      text: "Dulu selalu tebak-tebakan soal grade. Sekarang tinggal foto, hasilnya keluar, pembeli pun percaya karena ada buktinya.",
      name: "Pak Ahmad",
      role: "Petani Pinang, Jambi",
      avatarColor: "bg-emerald-200 text-emerald-800"
    },
    {
      text: "Sangat membantu saat pengumpulan massal. Grading 1 ton jadi jauh lebih cepat dan tidak ada perdebatan harga.",
      name: "Siti Rahma",
      role: "Pengepul, Riau",
      avatarColor: "bg-blue-100 text-blue-800"
    },
    {
      text: "Akurasi kadar airnya hampir sama dengan tes lab manual yang memakan waktu berhari-hari. Luar biasa!",
      name: "Budi Santoso",
      role: "Manager Koperasi Tani",
      avatarColor: "bg-green-300 text-green-800"
    }
  ];

  return (
    <section className="w-full py-20 bg-zinc-900 border-t border-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-emerald-450 text-sm uppercase tracking-widest font-bold">Testimoni Pengguna</h2>
          <p className="text-white text-3xl font-extrabold tracking-tight">Kata Mereka yang Telah Mencoba</p>
          <p className="text-stone-300 text-sm max-w-xl mx-auto">
            Membangun ekosistem agrikultur yang lebih transparan dan adil bagi semua pihak.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="p-8 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-between gap-6 hover:border-emerald-500/30 transition-all">
              <p className="text-stone-200 text-sm sm:text-base italic leading-relaxed">
                &quot;{item.text}&quot;
              </p>
              
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${item.avatarColor} flex items-center justify-center font-bold text-lg`}>
                  {item.name[0]}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white font-bold text-sm sm:text-base">{item.name}</span>
                  <span className="text-stone-400 text-xs sm:text-sm">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}