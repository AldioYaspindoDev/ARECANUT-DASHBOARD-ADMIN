export default function Blogs() {
  const articles = [
    { id: 'ART-0042', title: 'Panduan Lengkap Budidaya Pinang Unggul', status: 'Dipublikasikan', bgStatus: 'bg-emerald-100 text-emerald-800', author: 'Budi Santoso', date: '12 Okt 2023', img: 'https://placehold.co/24x24' },
    { id: 'ART-0041', title: 'Manajemen Pasca Panen: Menjaga Kualitas Grade A', status: 'Dipublikasikan', bgStatus: 'bg-emerald-100 text-emerald-800', author: 'Siti Aminah', date: '08 Okt 2023', img: 'https://placehold.co/24x24' },
    { id: 'ART-0040', title: 'Mengenal Penyakit Umum pada Tanaman Pinang', status: 'Draft', bgStatus: 'bg-amber-100 text-amber-800', author: 'Budi Santoso', date: '-', img: 'https://placehold.co/24x24' },
    { id: 'ART-0039', title: 'Teknologi AI dalam Klasifikasi Mutu Pinang', status: 'Dipublikasikan', bgStatus: 'bg-emerald-100 text-emerald-800', author: 'Sistem Admin', date: '01 Okt 2023', img: 'https://placehold.co/24x24' },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">Manajemen Artikel</h1>
          <p className="text-neutral-500 text-sm font-normal font-['Inter'] mt-1">Kelola konten edukasi dan informasi untuk pengguna aplikasi Pinang AI.</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <span className="text-base font-bold">+</span>
          <span>Buat Artikel Baru</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari judul artikel..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-100 rounded-lg border border-transparent focus:border-stone-300 focus:bg-white outline-none text-sm font-['Inter'] transition-colors"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-400 rounded-full" />
        </div>
        
        <button className="px-4 py-2 border border-stone-300 rounded-lg text-zinc-900 hover:bg-zinc-50 text-sm font-medium flex items-center gap-2 transition-colors">
          <span>Filter</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-stone-200">
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">ID Artikel</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Judul Artikel</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Penulis</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Tanggal Publikasi</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 text-emerald-900 text-sm font-semibold">{art.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-900 text-sm font-medium">{art.title}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${art.status === 'Draft' ? 'bg-amber-500' : 'bg-emerald-950'}`} />
                        <span className="text-neutral-500 text-xs">{art.status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img className="w-6 h-6 rounded-full object-cover border border-stone-200" src={art.img} alt={art.author} />
                      <span className="text-zinc-900 text-sm">{art.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">{art.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-neutral-700 rounded-md transition-colors text-xs font-medium">Edit</button>
                      <button className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-md transition-colors text-xs font-medium">Lihat</button>
                      <button className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md transition-colors text-xs font-medium">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-neutral-500 text-xs font-['Inter']">Menampilkan 1 hingga 4 dari 42 entri</span>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-stone-200 rounded-md opacity-50 hover:opacity-100 transition-opacity">
              &lt;
            </button>
            <button className="w-8 h-8 bg-emerald-900 text-white rounded-md text-xs font-semibold flex items-center justify-center">1</button>
            <button className="w-8 h-8 hover:bg-zinc-100 rounded-md text-xs font-semibold flex items-center justify-center">2</button>
            <button className="w-8 h-8 hover:bg-zinc-100 rounded-md text-xs font-semibold flex items-center justify-center">3</button>
            <span className="px-1 text-neutral-500">...</span>
            <button className="p-2 border border-stone-200 rounded-md hover:bg-zinc-50 transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}