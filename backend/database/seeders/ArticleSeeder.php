<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample e-books
        Article::create([
            'title' => 'Panduan Lengkap React untuk Pemula',
            'description' => 'Buku komprehensif untuk mempelajari React dari dasar hingga mahir. Cocok untuk developer yang ingin menguasai library JavaScript populer ini.',
            'content' => '**Bab 1: Pengenalan React**

React adalah library JavaScript yang dikembangkan oleh Facebook untuk membangun user interface yang interaktif. Library ini menggunakan konsep component-based architecture yang memungkinkan developer untuk membangun aplikasi web yang kompleks dengan cara yang lebih terstruktur dan mudah dipelihara.

**Fitur Utama React:**
• Virtual DOM untuk performa yang optimal
• Component-based architecture
• Unidirectional data flow
• JSX syntax yang mudah dipahami
• Rich ecosystem dan community support

**Mengapa Memilih React?**

React telah menjadi pilihan utama banyak developer karena kemudahan penggunaannya dan performa yang excellent. Dengan React, Anda dapat membangun aplikasi web modern yang responsive dan user-friendly.

**Memulai dengan React**

Untuk memulai belajar React, Anda perlu memahami konsep dasar JavaScript terlebih dahulu. Setelah itu, Anda dapat mulai mempelajari JSX, komponen, props, dan state management.',
            'slug' => Str::slug('Panduan Lengkap React untuk Pemula'),
            'type' => 'e-book',
            'author' => 'John Doe',
            'reading_time' => 120,
            'published_at' => now(),
        ]);

        Article::create([
            'title' => 'Manajemen Keuangan untuk UMKM',
            'description' => 'Panduan praktis manajemen keuangan untuk usaha mikro, kecil, dan menengah di era digital.',
            'content' => '**Pentingnya Manajemen Keuangan untuk UMKM**

Manajemen keuangan yang baik adalah kunci kesuksesan bagi setiap usaha, termasuk UMKM. Dengan pengelolaan keuangan yang tepat, UMKM dapat berkembang secara berkelanjutan dan menghadapi berbagai tantangan bisnis.

**Prinsip Dasar Manajemen Keuangan UMKM:**
• Pemisahan keuangan pribadi dan bisnis
• Pencatatan yang rapi dan sistematis
• Perencanaan cash flow yang realistis
• Diversifikasi sumber pendapatan
• Kontrol pengeluaran yang ketat

**Tips Praktis:**

1. **Gunakan Aplikasi Keuangan Digital** - Manfaatkan teknologi untuk memudahkan pencatatan dan monitoring keuangan.

2. **Buat Budget Bulanan** - Rencanakan pendapatan dan pengeluaran setiap bulan dengan detail.

3. **Siapkan Dana Darurat** - Sisihkan minimal 10% dari keuntungan untuk dana darurat bisnis.',
            'slug' => Str::slug('Manajemen Keuangan untuk UMKM'),
            'type' => 'e-book',
            'author' => 'Dr. Siti Rahayu',
            'reading_time' => 90,
            'published_at' => now(),
        ]);

        // Create sample e-kliping
        Article::create([
            'title' => 'Perkembangan AI di Indonesia Tahun 2024',
            'description' => 'Kumpulan berita dan analisis tentang perkembangan kecerdasan buatan di Indonesia sepanjang tahun 2024.',
            'content' => '**Pertumbuhan Pesat AI di Indonesia**

Tahun 2024 menjadi tahun yang sangat penting bagi perkembangan kecerdasan buatan (AI) di Indonesia. Berbagai sektor mulai mengadopsi teknologi AI untuk meningkatkan efisiensi dan produktivitas.

**Sektor yang Mengadopsi AI:**
1. Perbankan - Untuk deteksi fraud dan customer service
2. Healthcare - Diagnosa medis dan telemedicine
3. Pendidikan - Platform pembelajaran adaptif
4. Transportasi - Sistem navigasi pintar

**Tantangan dan Peluang**

Meskipun perkembangannya pesat, Indonesia masih menghadapi beberapa tantangan dalam implementasi AI, termasuk ketersediaan SDM yang kompeten dan infrastruktur teknologi yang memadai.

**Dampak terhadap Ekonomi**

Implementasi AI diperkirakan dapat meningkatkan GDP Indonesia hingga 15% dalam 10 tahun ke depan.',
            'slug' => Str::slug('Perkembangan AI di Indonesia Tahun 2024'),
            'type' => 'e-kliping',
            'author' => 'Tech News Indonesia',
            'reading_time' => 15,
            'published_at' => now(),
        ]);

        Article::create([
            'title' => 'Tren Digital Marketing 2024',
            'description' => 'Analisis mendalam tentang tren pemasaran digital yang akan mendominasi tahun 2024.',
            'content' => '**Revolusi Digital Marketing di 2024**

Tahun 2024 membawa perubahan signifikan dalam landscape digital marketing. Berbagai teknologi baru dan perubahan perilaku konsumen menciptakan peluang dan tantangan baru bagi marketer.

**Tren Utama 2024:**
• AI-powered personalization
• Voice search optimization
• Interactive content dan AR/VR
• Sustainability marketing
• Micro dan nano influencer marketing

**Strategi yang Efektif**

Marketer harus beradaptasi dengan cepat terhadap perubahan algoritma platform media sosial dan meningkatnya ekspektasi konsumen terhadap pengalaman yang personal dan relevan.',
            'slug' => Str::slug('Tren Digital Marketing 2024'),
            'type' => 'e-kliping',
            'author' => 'Marketing Today',
            'reading_time' => 20,
            'published_at' => now(),
        ]);
    }
}
