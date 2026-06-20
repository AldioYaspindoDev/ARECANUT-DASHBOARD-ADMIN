import { useState, useRef } from "react";
import { PinangService } from "../../services/pinangService";
import { FiUploadCloud, FiCheckCircle, FiLoader } from "react-icons/fi";

interface ScanResult {
  pinang_id: string;
  grade: string;
  jenis_pinang: string;
  tingkat_kekeringan: string;
  deskripsi?: string;
  persentase?: string;
  gambar?: string;
  harga_per_kg?: string;
}

export default function Scanner() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null); // Reset hasil jika ada gambar baru
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      // Field lain tidak perlu dikirim karena akan di-generate oleh AI secara otomatis di backend

      const response = await PinangService.CreatePinang(formData);
      setResult(response);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.detail || "Gagal melakukan deteksi pinang");
    } finally {
      setLoading(false);
    }
  };

  const getBgGradeClass = (grade: string) => {
    const normalized = grade.toLowerCase();
    if (normalized.includes("a")) return "bg-emerald-600 text-white";
    if (normalized.includes("b")) return "bg-amber-500 text-white";
    if (normalized.includes("c")) return "bg-rose-500 text-white";
    return "bg-zinc-500 text-white";
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-zinc-900 text-3xl font-semibold font-['Inter'] leading-9">
          Uji Coba Scanner AI
        </h1>
        <p className="text-neutral-500 text-sm font-normal font-['Inter']">
          Upload gambar biji pinang untuk memprediksi jenis dan kualitas secara otomatis menggunakan model TFLite.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 flex flex-col gap-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="w-full h-64 border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 transition-colors relative overflow-hidden group"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center justify-center text-neutral-500 gap-2">
                <FiUploadCloud className="w-10 h-10 text-stone-400 group-hover:text-[#572B18] transition-colors" />
                <span className="text-sm font-medium">Klik atau drop gambar di sini</span>
                <span className="text-xs">Mendukung JPG, PNG, WEBP</span>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <button
            onClick={handleScan}
            disabled={!selectedFile || loading}
            className="w-full py-3 bg-[#572B18] hover:bg-[#3D1E11] disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                Menganalisis...
              </>
            ) : (
              "Prediksi Sekarang"
            )}
          </button>

          {error && <div className="text-rose-500 text-sm font-medium text-center">{error}</div>}
        </div>

        {/* Results Area */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-zinc-900 border-b border-stone-100 pb-3 mb-4">
            Hasil Deteksi
          </h2>

          {result ? (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <FiCheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-zinc-900 font-bold text-lg">Prediksi Berhasil</h3>
                  <p className="text-neutral-500 text-xs">ID: {result.pinang_id.substring(0, 8)}...</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                  <p className="text-neutral-500 text-xs font-semibold mb-1 uppercase tracking-wide">Jenis Pinang</p>
                  <p className="text-zinc-900 font-semibold">{result.jenis_pinang}</p>
                </div>
                
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                  <p className="text-neutral-500 text-xs font-semibold mb-1 uppercase tracking-wide">Kualitas (Grade)</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${getBgGradeClass(result.grade)}`}>
                      {result.grade}
                    </span>
                    <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      {result.persentase}
                    </span>
                  </div>
                </div>

                <div className="bg-stone-50 p-4 rounded-lg border border-stone-100 col-span-2">
                  <p className="text-neutral-500 text-xs font-semibold mb-1 uppercase tracking-wide">Kekeringan</p>
                  <p className="text-zinc-900 text-sm font-medium">{result.tingkat_kekeringan}</p>
                  <p className="text-neutral-600 text-xs mt-1">{result.deskripsi}</p>
                </div>

                {result.harga_per_kg && (
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 col-span-2 flex items-center justify-between">
                    <div>
                      <p className="text-emerald-700 text-xs font-bold mb-0.5 uppercase tracking-wide">Estimasi Harga / Kg</p>
                      <p className="text-emerald-900 font-bold text-lg">Rp {parseInt(result.harga_per_kg).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full h-48 flex items-center justify-center text-center px-6">
              <p className="text-neutral-400 text-sm">
                Belum ada hasil. Silakan upload gambar dan jalankan prediksi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
