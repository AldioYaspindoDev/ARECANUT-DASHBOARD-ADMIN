import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo2.png";

export default function Navbar() {
  const navigate = useNavigate();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={Logo} alt="PinangCek Logo" className="h-10 w-auto object-contain" />
            <span className="text-emerald-950 text-xl font-bold tracking-tight">ArecaNut Grade AI</span>
          </div>

          {/* Menu Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              onClick={(e) => handleScroll(e, "home")}
              className="text-zinc-600 hover:text-emerald-900 text-sm font-medium transition-colors"
            >Home</a>
            <a
              href="#tantangan"
              onClick={(e) => handleScroll(e, "tantangan")}
              className="text-zinc-600 hover:text-emerald-900 text-sm font-medium transition-colors"
            > 
              Tantangan
            </a>
            <a
              href="#cara-kerja"
              onClick={(e) => handleScroll(e, "cara-kerja")}
              className="text-zinc-600 hover:text-emerald-900 text-sm font-medium transition-colors"
            >
              Cara Kerja
            </a>

            <a
              href="#unggulan"
              onClick={(e) => handleScroll(e, "unggulan")}
              className="text-zinc-600 hover:text-emerald-900 text-sm font-medium transition-colors"
            >
              Unggulan
            </a>


            <a
              href="#harga"
              onClick={(e) => handleScroll(e, "harga")}
              className="text-zinc-600 hover:text-emerald-900 text-sm font-medium transition-colors"
            >
              Harga Acuan
            </a>
            <a
              href="#edukasi"
              onClick={(e) => handleScroll(e, "edukasi")}
              className="text-zinc-600 hover:text-emerald-900 text-sm font-medium transition-colors"
            >
              Blogs
            </a>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-emerald-900 hover:text-emerald-955 text-sm font-semibold transition-colors px-4 py-2">
              Login Admin
            </Link>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white text-sm font-semibold rounded-xl shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer"
            >
              Uji Coba Scanner
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}