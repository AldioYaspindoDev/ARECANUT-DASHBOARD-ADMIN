import { useEffect, useState } from "react"
import type { Article } from "../../interface/Article"
import { ArticleService } from "../../services/articleService";
import { API_BASE_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

export default function Blogs() {
  
    const[blog, setBlog] = useState<Article[]>([]);
    const[loading, setLoading] = useState(false);

    const HandleBlog = async () => {
      setLoading(true)
      try {
        const response = await ArticleService.GetAllService()
        setBlog(Array.isArray(response) ? response : response.items ?? response.data ?? []);
      } catch (error) {
        console.error("gagal mendapatkan data article", error);
      } finally {
        setLoading(false)
      }
    }

    useEffect(()=> {
      HandleBlog()
    },[]);

    if(loading){
      return(
        <div className="items-center justify-center">
          <div className="animate-spin"></div>
        </div>
      )
    }

      const getImageUrl = (path?: string) => {
        if (!path) return "https://placehold.co/80x80?text=No+Image";
        if (path.startsWith("http://") || path.startsWith("https://")) return path;
        const cleanPath = path.startsWith("/") ? path.substring(1) : path;
        return `${API_BASE_URL}/${cleanPath}`;
      };

  return (
    <section id="edukasi" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-6 border-b border-stone-250">
          <div className="flex flex-col gap-3">
            <h2 className="text-[#572B18] text-sm uppercase tracking-widest font-bold">Edukasi &amp; Artikel</h2>
            <p className="text-zinc-900 text-3xl font-extrabold tracking-tight">Tingkatkan Hasil Panen Anda</p>
          </div>
          <button className="text-emerald-800 hover:text-emerald-950 font-bold text-sm flex items-center gap-1.5 transition-colors">
            Lihat Semua Artikel →
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blog.map((item, idx) => (
            <Link key={idx} to={`/blog/${item.id}`}  className="group flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow p-4 rounded-2xl border border-stone-150 bg-white">
              {/* Image wrap */}
              <div className="relative rounded-xl overflow-hidden aspect-video">
                <img 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  src={getImageUrl(item.gambar)} 
                  alt={item.judul} 
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-900 text-white text-xs font-bold rounded-full">
                      {new Date(item.tanggal || new Date()).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-zinc-900 font-bold text-lg leading-snug group-hover:text-emerald-900 transition-colors">
                  {item.judul}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3">
                  {item.isi}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}