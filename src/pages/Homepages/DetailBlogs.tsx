import { ArticleService } from "../../services/articleService";
import type { Article } from "../../interface/Article";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/constants";

import Navbar from "./Navbar";

export default function DetailBlogs() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(false);

    const HandleGetArticle = async () => {
        setLoading(true);
        try {
            const response = await ArticleService.GetByIdService(id!)
            setArticle(response);
        } catch (error) {
            console.error("Gagal Mendapatkan Data Article", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        HandleGetArticle();
    }, [id]);

    if (loading) {
        <div className="flex flex-col justify-center items-center">
            <div className="animate-spin"></div>
        </div>
    }

    if (!article) {
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-3xl">Data Tidak Ditemukan !</h1>
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
        <article>
        <Navbar/>
        <div className="max-w-3xl mx-auto px-4 py-16">
            <button onClick={() => navigate(-1)} className="mb-6 text-emerald-800 font-bold">← Kembali</button>
            <img src={getImageUrl(article.gambar)} className="w-full rounded-xl mb-6" alt={article.judul} />
            <p className="text-sm text-neutral-500 mb-2">{new Date(article.tanggal).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</p>
            <h1 className="text-3xl font-extrabold text-zinc-900 mb-6">{article.judul}</h1>
            <div className="text-neutral-700 leading-relaxed text-justify whitespace-pre-line">{article.isi}</div>
        </div>
        </article>
    )
}