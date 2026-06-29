import { useNavigate } from "react-router-dom";
import { FaCamera, FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import Homepage from "../../assets/Homepage.jpeg";
import Logo from "../../assets/Logo.png";


export default function HeroSections() {
  const navigate = useNavigate();

  return (
    <section id="home" className="bg-slate-50 flex items-center justify-center py-16 lg:py-24 relative overflow-hidden font-['Inter']">
      {/* Abstract Background Blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-emerald-700/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-emerald-900/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 lg:pr-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider">Akurasi Lab-Grade 95%+</span>
            </div>

            {/* Title */}
            <h1 className="text-zinc-900 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Deteksi Kualitas <span className="text-emerald-850">Biji Pinang</span> Secara Instan & Objektif
            </h1>

            {/* Subtitle */}
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Solusi cerdas berbasis Computer Vision untuk menentukan grade biji pinang secara instan. Membantu petani dan pengepul meningkatkan transparansi harga pasar.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <button
                onClick={() => navigate("/scan")}
                className="px-8 py-3.5 bg-emerald-900 hover:bg-emerald-950 text-white text-sm font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <FaCamera className="text-base" />
                <span>Scan Biji Pinang</span>
              </button>
              <a
                href="#cara-kerja"
                className="px-8 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-neutral-700 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FaInfoCircle className="text-neutral-500" />
                <span>Cara Kerja AI</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-stone-200 w-full max-w-md">
              <div className="flex items-center gap-2.5">
                <FaCheckCircle className="text-emerald-600 text-lg flex-shrink-0" />
                <span className="text-zinc-700 text-xs sm:text-sm font-medium">Proses Cepat &lt; 5 Detik</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCheckCircle className="text-emerald-600 text-lg flex-shrink-0" />
                <span className="text-zinc-700 text-xs sm:text-sm font-medium">Standardisasi Grade A/B/C</span>
              </div>
            </div>
          </div>

          {/* Right Column: Phone Mockup Visual */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="absolute w-72 h-72 bg-emerald-900/10 rounded-full blur-[48px] -z-10" />
            
            {/* Phone Container */}
            <div className="w-72 h-[580px] bg-zinc-950 rounded-[48px] shadow-2xl border-[10px] border-zinc-900 relative overflow-hidden flex flex-col">
              {/* iPhone Dynamic Island notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-900 rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 mr-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              </div>

              {/* Simulated Screen */}
              <div className="flex-1 bg-white flex flex-col overflow-hidden relative">
                {/* App Header Inside Phone */}
                <div className="pt-10 pb-3 px-4 border-b border-stone-100 flex justify-between items-center bg-white/95 backdrop-blur-sm z-20">
                  <span className="text-emerald-900 text-sm font-extrabold tracking-tight">ArecanutGrade AI</span>
                  <img src={Logo} alt="Logo" className="w-8"/>
                </div>

                {/* App Main Area Inside Phone */}
                <div className="flex-1 relative flex flex-col justify-center items-center bg-stone-100">
                  <img 
                    className="w-full h-full object-cover absolute inset-0 filter brightness-95" 
                    src={Homepage}
                    alt="Areca nut scanning mockup" 
                  />
                  
                  {/* Camera view overlay scanning grid */}
                  <div className="absolute inset-0 bg-black/10 z-10" />

                  {/* Result Overlay Card Inside Phone */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl z-20 border border-white/20 flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <div className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>Grade A</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-500 block">Kecocokan</span>
                        <span className="text-xs font-bold text-zinc-800">98.2%</span>
                      </div>
                    </div>
                    
                    <div className="h-px bg-stone-200" />
                    
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Kekeringan</span>
                        <span className="font-semibold text-zinc-900">85% (Kering Sempurna)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500">Estimasi Harga</span>
                        <span className="font-bold text-emerald-800">Rp 12.500/kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}