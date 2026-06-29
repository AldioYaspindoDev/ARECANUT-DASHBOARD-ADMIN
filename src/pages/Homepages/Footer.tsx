import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <section className="w-full py-20 bg-emerald-900 text-white relative overflow-hidden font-['Inter']">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-full bg-white/5 skew-x-12 transform origin-top-right pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-full bg-black/10 -skew-x-12 transform origin-bottom-left pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col gap-8 items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Siap Tingkatkan Hasil Pinang Anda?
        </h2>
        
        <p className="text-emerald-100 text-base sm:text-lg leading-relaxed max-w-2xl">
          Bergabunglah dengan ribuan petani lainnya yang telah beralih ke grading berbasis AI yang akurat, transparan, dan terpercaya.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mt-2">
          <button
            onClick={() => navigate("/scan")}
            className="px-8 py-4 bg-white text-emerald-900 hover:bg-stone-50 font-bold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl cursor-pointer"
          >
            Coba PinangCek Sekarang, Gratis
          </button>
          <a
            href="/ArecaNutGradeAI.apk"
            download="ArecaNutGradeAI.apk"
            className="px-8 py-4 bg-emerald-800 hover:bg-emerald-750 text-emerald-100 font-semibold rounded-xl border border-emerald-700 transition-colors cursor-pointer"
          >
            Download Applikasi
          </a>
        </div>

        <span className="text-emerald-200 text-xs sm:text-sm font-medium mt-2">
          Tersedia untuk Android dan iOS
        </span>
      </div>
    </section>
  );
}