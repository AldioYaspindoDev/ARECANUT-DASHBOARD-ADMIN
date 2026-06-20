import Pinang from '../../assets/Pinang.jpg';

export default function HowWorks() {
  const steps = [
    {
      num: 1,
      title: "Foto Pinang",
      desc: "Ambil foto pinang secara langsung melalui kamera aplikasi. Pastikan pencahayaan cukup untuk hasil terbaik."
    },
    {
      num: 2,
      title: "Analisis AI",
      desc: "Sistem AI kami akan memproses citra untuk membaca tekstur, gradasi warna, dan morfologi biji pinang secara mendalam."
    },
    {
      num: 3,
      title: "Lihat Hasil & Harga",
      desc: "Dapatkan Grade A/B/C, estimasi kadar air, dan harga acuan pasar terbaru secara instan di layar Anda."
    }
  ];

  return (
    <section id="cara-kerja" className="w-full py-20 bg-zinc-50 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Steps List */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h2 className="text-[#572B18] text-sm uppercase tracking-widest font-bold">
              3 Langkah Mudah
            </h2>
            <p className="text-zinc-900 text-3xl md:text-4xl font-extrabold tracking-tight">
              Bagaimana Cara Kerjanya?
            </p>
            
            <div className="flex flex-col gap-8 mt-4">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 text-white font-bold flex items-center justify-center flex-shrink-0 shadow-md">
                    {step.num}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-zinc-900 text-lg font-bold">{step.title}</h3>
                    <p className="text-neutral-650 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-sm p-4 bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden relative">
              <img 
                className="w-full h-80 object-cover rounded-2xl" 
                src={Pinang}
                alt="Areca nut sorting process"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-955/50 via-transparent to-transparent pointer-events-none rounded-2xl m-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}