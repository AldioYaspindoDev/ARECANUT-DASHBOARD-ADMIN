export default function Prices() {
  const pricesList = [
    { grade: 'Grade A', bgGrade: 'bg-emerald-500 text-white', price: 'Rp 15.500', note: 'Kualitas super, biji utuh, kadar air < 5%', updated: 'Hari ini, 08:00 WIB' },
    { grade: 'Grade B', bgGrade: 'bg-amber-500 text-white', price: 'Rp 12.000', note: 'Kualitas menengah, sedikit pecahan, kadar air 5-10%', updated: 'Kemarin, 14:30 WIB' },
    { grade: 'Grade C', bgGrade: 'bg-red-500 text-white', price: 'Rp 8.500', note: 'Kualitas rendah, banyak pecahan/jamur, kadar air > 10%', updated: '3 hari lalu' },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">Manajemen Harga Acuan</h1>
          <p className="text-neutral-500 text-sm font-normal font-['Inter'] mt-1">Atur harga acuan biji pinang berdasarkan grade kualitas.</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <span className="text-base font-bold">+</span>
          <span>Update Harga</span>
        </button>
      </div>

      {/* Grid of Current Prices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricesList.map((item) => (
          <div key={item.grade} className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-center">
              <span className={`px-2.5 py-1 rounded text-xs font-semibold ${item.bgGrade}`}>
                {item.grade}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">HARGA ACUAN SAAT INI</span>
              <div className="flex items-baseline gap-1">
                <span className="text-zinc-900 text-3xl font-bold font-['Inter'] leading-9">{item.price}</span>
                <span className="text-neutral-500 text-sm">/ kg</span>
              </div>
              <span className="text-neutral-500 text-[11px] mt-2">Terakhir diperbarui: {item.updated}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-zinc-900 text-xl font-semibold font-['Inter'] leading-7">Daftar Harga Acuan</h2>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Cari..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-100 rounded-lg border border-transparent focus:border-stone-300 focus:bg-white outline-none text-sm font-['Inter'] transition-colors"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-neutral-400 rounded-full" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-stone-200">
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Grade</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Harga per KG</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Keterangan</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider">Terakhir Diperbarui</th>
                <th className="px-6 py-4 text-neutral-500 text-xs font-semibold font-['Inter'] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150">
              {pricesList.map((item) => (
                <tr key={item.grade} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded text-xs font-semibold ${item.bgGrade}`}>
                      {item.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-900 text-sm font-semibold">{item.price}</td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">{item.note}</td>
                  <td className="px-6 py-4 text-neutral-600 text-sm">{item.updated}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-neutral-700 rounded-md transition-colors text-xs font-medium">Edit</button>
                      <button className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md transition-colors text-xs font-medium">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 flex justify-between items-center">
          <span className="text-neutral-500 text-xs font-['Inter']">Menampilkan 1-3 dari 3 data</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 border border-stone-200 rounded-md opacity-50 hover:opacity-100">
              &lt;
            </button>
            <button className="w-8 h-8 bg-emerald-900 text-white rounded-md text-xs font-semibold flex items-center justify-center">1</button>
            <button className="p-1.5 border border-stone-200 rounded-md opacity-50 hover:opacity-100">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}