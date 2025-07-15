import React from 'react';

export default function Home() {
    return(
        <div className='flex flex-col min-h-screen bg-white pt-24'>
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center py-25">
                <h1 className="text-6xl font-semibold mb-8">
                    Dummy Judul
                </h1>
                <img 
                    className='w-45 h-45 mb-8'
                    src="https://cdn.pekalongankab.go.id/uploads/dinas_98e2f2b35f.ico" 
                    alt="Logo"
                />
                <h3 className='text-2xl font-semibold text-center mb-4'>
                    Portal Informasi Publik Kabupaten Pekalongan
                </h3>
                <p className='text-lg text-center mb-8'>
                    Akses Mudah ke Majalah, E-Book, dan Kliping Resmi Pemerintah Daerah
                </p>
                <a 
                    className='btn btn-primary text-lg font-semibold px-8 py-3 rounded-full'
                    href="#">
                    Lihat Publikasi
                </a>
            </div>

            {/* Publications Section */}
            <div className='px-8 mb-8'>
                <h1 className='text-4xl font-semibold text-left mb-8'>
                    Publikasi Unggulan
                </h1>
                
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-300 overflow-hidden">
                        <img 
                            className="w-full h-80 object-cover" 
                            src="https://placehold.co/352x352" 
                            alt="Article"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-black mb-4 leading-tight">
                                Selamat dan Sukses atas Terselenggaranya Seminar Nasional Inovasi Pelayanan Publik 2025
                            </h2>
                            <p className="text-base text-black mb-6 leading-relaxed">
                                Dinas Komunikasi dan Informatika Kabupaten Purbalingga mengucapkan selamat dan sukses atas terselenggaranya Seminar Nasional yang menjadi wadah kolaborasi antar daerah dalam mendorong digitalisasi layanan publik.
                            </p>
                            <div className="flex justify-between items-center">
                                <span href="#" className="btn btn-ghost bg-blue-600 text-white px-4 py-2 rounded-md font-bold text-sm">
                                    Artikel
                                </span>
                                <span className="text-black font-bold text-lg">
                                    10 Juni 2025
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-300 overflow-hidden">
                        <img 
                            className="w-full h-80 object-cover" 
                            src="https://placehold.co/352x352" 
                            alt="Article"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-black mb-4 leading-tight">
                                Selamat dan Sukses atas Terselenggaranya Seminar Nasional Inovasi Pelayanan Publik 2025
                            </h2>
                            <p className="text-base text-black mb-6 leading-relaxed">
                                Dinas Komunikasi dan Informatika Kabupaten Purbalingga mengucapkan selamat dan sukses atas terselenggaranya Seminar Nasional yang menjadi wadah kolaborasi antar daerah dalam mendorong digitalisasi layanan publik.
                            </p>
                            <div className="flex justify-between items-center">
                                <span href="#" className="btn btn-ghost bg-blue-600 text-white px-4 py-2 rounded-md font-bold text-sm">
                                    Artikel
                                </span>
                                <span className="text-black font-bold text-lg">
                                    10 Juni 2025
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-300 overflow-hidden">
                        <img 
                            className="w-full h-80 object-cover" 
                            src="https://placehold.co/352x352" 
                            alt="Article"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-black mb-4 leading-tight">
                                Selamat dan Sukses atas Terselenggaranya Seminar Nasional Inovasi Pelayanan Publik 2025
                            </h2>
                            <p className="text-base text-black mb-6 leading-relaxed">
                                Dinas Komunikasi dan Informatika Kabupaten Purbalingga mengucapkan selamat dan sukses atas terselenggaranya Seminar Nasional yang menjadi wadah kolaborasi antar daerah dalam mendorong digitalisasi layanan publik.
                            </p>
                            <div className="flex justify-between items-center">
                                <span href="#" className="btn bg-blue-600 text-white px-4 py-2 rounded-md font-bold text-sm">
                                    Artikel
                                </span>
                                <span className="text-black font-bold text-lg">
                                    10 Juni 2025
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="px-8 mb-8">
                <h1 className='text-4xl font-semibold text-left mb-8'>
                    Tentang Portal
                </h1>
                <p className='text-xl text-black mt-6 pr-24'>
                    Dummy PKL adalah layanan dokumentasi dan publikasi digital resmi dari Dinas Komunikasi dan Informatika Kabupaten Pekalongan. Melalui portal ini, masyarakat dapat mengakses berbagai informasi dan laporan resmi dengan mudah dan cepat.
                </p>
            </div>
        </div>
    )
}