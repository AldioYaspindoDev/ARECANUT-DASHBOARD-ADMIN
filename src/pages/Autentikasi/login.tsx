import React, { useState } from 'react';
import backgroundPinang from '../../assets/backround-pinang.jpg';
import Logo from '../../assets/Logo.png';
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LoginService } from '../../services/loginService';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);
        try {
            const response = await LoginService.login({ email, password });
            
            // Simpan token yang diterima dari API ke localStorage
            localStorage.setItem('token', response.access_token);
            
            // Arahkan ke halaman utama/dashboard admin
            window.location.href = '/';
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.response?.data?.message || 'Email atau kata sandi salah. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-[1280px] bg-gray-50 inline-flex justify-start items-start">
            <div className="flex-1 self-stretch relative bg-[#572B18] flex justify-center items-start overflow-hidden">
                <img className="w-[640px] h-[723px] left-0 top-0 absolute" src={backgroundPinang} alt="Agriculture background" />
                <div className="w-[640px] h-[723px] left-0 top-0 absolute bg-gradient-to-r from-[#572B18]/70 to-[#9B6751]/80" />
                <div className="flex-1 self-stretch p-12 inline-flex flex-col justify-between items-start relative z-10">
                    <div className="self-stretch inline-flex justify-start items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl outline outline-1 outline-offset-[-1px] outline-white/30 backdrop-blur-[6px] flex justify-center items-center">
                            <div className="inline-flex flex-col justify-start items-start">
                                <img src={Logo} alt="Logo Utama" />
                            </div>
                        </div>
                        <div className="inline-flex flex-col justify-start items-start">
                            <div className="justify-center text-white text-xl font-bold font-['Inter'] leading-7">ArecaNut Grade</div>
                        </div>
                    </div>
                    <div className="w-96 max-w-96 flex flex-col justify-start items-start gap-4">
                        <div className="self-stretch flex flex-col justify-start items-start">
                            <div className="self-stretch justify-center text-white text-4xl font-bold font-['Inter'] leading-10">Masa Depan Agrikultur<br />Berbasis Data.</div>
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-start">
                            <div className="self-stretch justify-center text-[#FFF3ED]/80 text-base font-normal font-['Inter'] leading-6">Sistem cerdas klasifikasi kualitas pinang menggunakan<br />kecerdasan buatan untuk akurasi maksimal.</div>
                        </div>
                    </div>
                    <div className="self-stretch opacity-60 flex flex-col justify-start items-start">
                        <div className="self-stretch justify-center text-white text-base font-normal font-['Inter'] leading-6">© 2024 Pinang AI Agricultural Intelligence. Seluruh Hak Cipta<br />Dilindungi.</div>
                    </div>
                </div>
            </div>
            <div className="flex-1 self-stretch p-24 bg-gray-50 flex justify-center items-center">
                <div className="w-96 max-w-96 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch pb-10 flex flex-col justify-start items-start">
                        <div className="self-stretch flex flex-col justify-start items-start gap-2">
                            <div className="self-stretch flex flex-col justify-start items-start">
                                <div className="self-stretch justify-center text-zinc-900 text-base font-normal font-['Inter'] leading-6">Selamat Datang Kembali</div>
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start">
                                <div className="self-stretch justify-center text-neutral-700 text-base font-normal font-['Inter'] leading-6">Masuk ke dashboard admin untuk mengelola sistem.</div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch pb-4 flex flex-col justify-start items-start w-full">
                        <div className="self-stretch flex flex-col justify-start items-start gap-6">
                            <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
                                <div className="self-stretch flex flex-col justify-start items-start">
                                    <div className="self-stretch justify-center text-neutral-700 text-base font-normal font-['Inter'] leading-6">EMAIL</div>
                                </div>
                                <div className="self-stretch relative flex flex-col justify-start items-center">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@pinangai.id"
                                        className="self-stretch w-full pl-12 pr-4 py-3.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-300 text-neutral-700 text-base font-normal font-['Inter'] focus:outline-[#572B18]"
                                        required
                                    />
                                    <div className="h-6 left-[16px] top-[15px] absolute flex flex-col justify-start items-start pointer-events-none">
                                        <MdOutlineMailOutline className='w-5 h-5' />
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
                                <div className="self-stretch flex flex-col justify-start items-start">
                                    <div className="self-stretch justify-center text-neutral-700 text-base font-normal font-['Inter'] leading-6">KATA SANDI</div>
                                </div>
                                <div className="self-stretch relative flex flex-col justify-start items-start">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="self-stretch w-full px-12 py-3.5 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-300 text-neutral-700 text-base font-normal font-['Inter'] focus:outline-[#572B18]"
                                        required
                                    />
                                    <div className="h-6 left-[16px] top-[15px] absolute flex flex-col justify-start items-start pointer-events-none">
                                        <TbLockPassword className='w-5 h-5'/>
                                    </div>
                                    <div className="left-[402px] top-[17px] absolute flex flex-col justify-center items-center pointer-events-none">
                                        <div className="inline-flex justify-center items-start">
                                            <FaEye/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch inline-flex justify-between items-center w-full">
                                <div className="flex justify-start items-center gap-2">
                                    <input 
                                        type="checkbox" 
                                        id="remember" 
                                        className="w-5 h-5 bg-white rounded border-2 border-stone-300 accent-[#572B18] cursor-pointer" 
                                    />
                                    <label htmlFor="remember" className="justify-center text-neutral-700 text-base font-normal font-['Inter'] leading-6 cursor-pointer">
                                        Ingat saya
                                    </label>
                                </div>
                                <button type="button" className="justify-center text-[#572B18] text-base font-bold font-['Inter'] leading-6 bg-transparent border-0 cursor-pointer">
                                    Lupa kata sandi?
                                </button>
                            </div>
                             {errorMsg && (
                                 <div className="self-stretch text-red-600 text-sm font-semibold font-['Inter']">
                                     {errorMsg}
                                 </div>
                             )}
                             <button 
                                 type="submit" 
                                 disabled={loading}
                                 className={`self-stretch w-full px-6 py-4 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] inline-flex justify-center items-center gap-2 cursor-pointer border-none transition-colors ${loading ? 'bg-[#3D1E11] opacity-70 cursor-not-allowed' : 'bg-[#572B18] hover:bg-[#3D1E11]'}`}
                             >
                                 <span className="text-center text-white text-base font-normal font-['Inter'] leading-6">
                                     {loading ? 'Sedang Masuk...' : 'Masuk'}
                                 </span>
                                 <FaLongArrowAltRight className='text-white'/>
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}