import Logo from "../../assets/Logo3.png"
import { FaWhatsapp } from "react-icons/fa6";

export default function Components9() {
  return (
    <footer className="w-full py-16 bg-zinc-950 text-stone-300 border-t border-white/5 font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/5">
          {/* Main Info */}
          <div className="flex flex-col items-start gap-4">
            <img src={Logo} alt="Logo" className="w-20" />
            <span className="text-white text-xl font-bold">ArecaNut Grade AI</span>
            <p className="text-stone-400 text-sm leading-relaxed text-left">
              Solusi AI pertama di Indonesia untuk grading pinang otomatis yang objektif dan presisi, meningkatkan transparansi pasar.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a href="https://wa.me/6285183200450" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-emerald-500/20 transition-colors">
                <FaWhatsapp />
              </a>
              <a href="https://www.instagram.com/way.dev/?hl=en" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-emerald-500/20 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="flex flex-col gap-4 text-left">
            <span className="text-emerald-450 font-bold text-sm uppercase tracking-wider">Produk</span>
            <ul className="flex flex-col gap-2 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Aplikasi Mobile</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dashboard Admin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrasi API</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="flex flex-col gap-4 text-left">
            <span className="text-emerald-450 font-bold text-sm uppercase tracking-wider">Edukasi</span>
            <ul className="flex flex-col gap-2 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Blog &amp; Berita</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Panduan Grading</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Video Tutorial</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="flex flex-col gap-4 text-left">
            <span className="text-emerald-450 font-bold text-sm uppercase tracking-wider">Bantuan</span>
            <ul className="flex flex-col gap-2 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-stone-500">
          <span>&copy; 2026 ArecaNut Grade AI. All rights reserved.</span>
          <span>Precision Agriculture Technology.</span>
        </div>
      </div>
    </footer>
  );
}