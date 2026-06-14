export default function History() {
  const historyList = [
    { id: '#DET-8832', user: 'Budi Santoso', email: 'budi@agri.id', avatar: 'https://placehold.co/32x32', grade: 'GRADE A', bgGrade: 'bg-emerald-600 text-white', pinId: 'PIN-401', pinImg: 'https://placehold.co/48x48', time: '12 Okt 2023, 14:30' },
    { id: '#DET-8831', user: 'Siti Aminah', email: 'siti.a@koperasi.id', avatar: 'S', bgAvatar: 'bg-zinc-200 text-emerald-900', grade: 'GRADE B', bgGrade: 'bg-amber-600 text-white', pinId: 'PIN-400', pinImg: 'https://placehold.co/48x48', time: '12 Okt 2023, 13:15' },
    { id: '#DET-8830', user: 'Distributor CV Maju', email: 'admin@cvmaju.com', avatar: 'https://placehold.co/32x32', grade: 'GRADE C', bgGrade: 'bg-red-600 text-white', pinId: 'PIN-399', pinImg: 'https://placehold.co/48x48', time: '12 Okt 2023, 10:05' },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">Riwayat Deteksi Global</h1>
          <p className="text-neutral-500 text-sm font-normal font-['Inter'] mt-1">Pantau log aktivitas klasifikasi kualitas pinang dari seluruh pengguna terdaftar.</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <span className="text-base font-bold">⬇</span>
          <span>Export Data (CSV)</span>
        </button>
      </div>

      {/* Filter / Search section */}
      <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari ID atau Nama User..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-100 rounded-lg border border-transparent focus:border-stone-300 focus:bg-white outline-none text-sm font-['Inter'] transition-colors"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-400 rounded-full" />
          </div>
          <input
            type="date"
            className="w-full px-4 py-2 bg-zinc-100 rounded-lg border border-transparent focus:border-stone-300 focus:bg-white outline-none text-sm font-['Inter'] transition-colors"
          />
        </div>
        <button className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-zinc-900 text-xs font-semibold rounded-lg transition-colors">
          Filter
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-stone-200">
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">ID History</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Info Pinang</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Waktu Deteksi</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150">
              {historyList.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 text-neutral-550 text-sm font-mono">{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.avatar.startsWith('http') ? (
                        <img className="w-8 h-8 rounded-full object-cover border border-stone-200" src={item.avatar} alt={item.user} />
                      ) : (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${item.bgAvatar}`}>
                          {item.avatar}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-zinc-900 text-sm font-medium">{item.user}</span>
                        <span className="text-neutral-500 text-xs">{item.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.pinImg ? (
                        <img className="w-12 h-12 rounded object-cover border border-stone-200" src={item.pinImg} alt={item.pinId} />
                      ) : (
                        <div className="w-12 h-12 bg-zinc-100 rounded border border-stone-300 flex items-center justify-center text-xs text-neutral-500">
                          No Img
                        </div>
                      )}
                      <div className="flex flex-col gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-center w-fit ${item.bgGrade}`}>
                          {item.grade}
                        </span>
                        <span className="text-neutral-500 text-xs">Img ID: {item.pinId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">{item.time}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 bg-red-55 hover:bg-red-100 text-red-700 rounded-md transition-colors text-xs font-semibold">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-neutral-500 text-xs font-['Inter']">Menampilkan 1-3 dari 1,240 data</span>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-stone-200 rounded-md opacity-50 hover:opacity-100 transition-opacity">
              &lt;
            </button>
            <button className="w-8 h-8 bg-emerald-900 text-white rounded-md text-xs font-semibold flex items-center justify-center">1</button>
            <button className="w-8 h-8 hover:bg-zinc-100 rounded-md text-xs font-semibold flex items-center justify-center">2</button>
            <button className="w-8 h-8 hover:bg-zinc-100 rounded-md text-xs font-semibold flex items-center justify-center">3</button>
            <button className="p-2 border border-stone-200 rounded-md hover:bg-zinc-50 transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}