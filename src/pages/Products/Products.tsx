export default function Products() {
  const pinangData = [
    { id: 'PNG-8921', image: 'https://placehold.co/40x48', type: 'Betara', grade: 'Grade A', bgGrade: 'bg-emerald-500 text-white', dryPercentage: '95%', date: '12 Okt 2023', user: 'Budi Petani', initials: 'BP', bgUser: 'bg-emerald-800 text-green-300' },
    { id: 'PNG-8920', image: 'https://placehold.co/40x48', type: 'Bulat', grade: 'Grade B', bgGrade: 'bg-amber-500 text-white', dryPercentage: '82%', date: '12 Okt 2023', user: 'Agro Sumatra', initials: 'AS', bgUser: 'bg-amber-500 text-yellow-900' },
    { id: 'PNG-8919', image: 'https://placehold.co/40x48', type: 'Belah', grade: 'Grade C', bgGrade: 'bg-red-500 text-white', dryPercentage: '60%', date: '11 Okt 2023', user: 'Koperasi Makmur', initials: 'KM', bgUser: 'bg-red-700 text-rose-300' },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">
          Data Pinang Terdeteksi
        </h1>
        <p className="text-neutral-500 text-sm font-normal font-['Inter']">
          Memantau hasil deteksi kualitas biji pinang dari seluruh pengguna sistem.
        </p>
      </div>

      {/* Filter Options */}
      <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="text-neutral-700 text-xs font-semibold font-['Inter'] tracking-wide">
              Filter Grade
            </label>
            <select className="px-4 py-2 bg-gray-50 border border-stone-300 rounded-lg text-sm text-zinc-900 outline-none w-full focus:bg-white">
              <option>Semua Grade</option>
              <option>Grade A</option>
              <option>Grade B</option>
              <option>Grade C</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-neutral-700 text-xs font-semibold font-['Inter'] tracking-wide">
              Jenis Pinang
            </label>
            <select className="px-4 py-2 bg-gray-50 border border-stone-300 rounded-lg text-sm text-zinc-900 outline-none w-full focus:bg-white">
              <option>Semua Jenis</option>
              <option>Betara</option>
              <option>Bulat</option>
              <option>Belah</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-neutral-700 text-xs font-semibold font-['Inter'] tracking-wide">
              Rentang Tanggal
            </label>
            <input
              type="date"
              className="px-4 py-2 bg-gray-50 border border-stone-300 rounded-lg text-sm text-zinc-900 outline-none w-full focus:bg-white"
            />
          </div>

          <button className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors text-center w-full">
            Terapkan Filter
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-stone-200">
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Foto</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">ID Pinang</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Jenis</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Grade</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Kekeringan</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">User Pemilik</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150">
              {pinangData.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-3">
                    <img className="w-10 h-12 rounded object-cover border border-stone-200" src={item.image} alt={item.id} />
                  </td>
                  <td className="px-6 py-4 text-zinc-900 text-sm font-medium">{item.id}</td>
                  <td className="px-6 py-4 text-zinc-900 text-sm">{item.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${item.bgGrade}`}>
                      {item.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-900 text-sm">{item.dryPercentage}</td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">{item.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${item.bgUser}`}>
                        {item.initials}
                      </div>
                      <span className="text-zinc-900 text-sm">{item.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      <button className="text-emerald-950 hover:underline text-xs font-semibold">Lihat Detail</button>
                      <button className="text-red-700 hover:underline text-xs font-semibold">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-neutral-500 text-xs font-['Inter']">
            Menampilkan 1-10 dari 245 data
          </span>
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