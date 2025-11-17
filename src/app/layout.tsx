import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { CartProvider } from "@/context/CartContext"
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
  title: {
    template: '%s | BUMDES Kutabima',
    default: ''
  },
  description: "",
  icons: [{ rel: 'shortcut icon', url: "/favicon.ico" }],
  generator: 'Next.js',
  applicationName: 'BUMDES Kutabima E-commerc',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'BUMDES', 'BUMDES Kutabima', 'BUM Desa', 'Badan Usaha Milik Desa',
    'Desa Kutabima', 'Kutabima', 'Produk Lokal Kutabima', 'UMKM Desa',
    'Produk Lokal', 'Produk Desa', 'Ekonomi Desa', 'Pemberdayaan Desa',
    'Dukung Produk Lokal', 'Dukung Lokal', 'Dukung UMKM', 'UMKM Indonesia',
    'UMKM Majenang', 'UMKM Cilacap', 'UMKM Jawa Tengah',
    'Produk Unggulan Desa', 'Produk Khas Desa', 'Produk Dalam Negeri',
    'Brand Lokal', 'Belanja Produk Lokal', 'Belanja Desa', 'Produk Rakyat',
    'Ekonomi Kerakyatan', 'Kecamatan Cimanggu', 'Cimanggu', 'Cimanggu Cilacap',
    'Majenang', 'Majenang Cilacap', 'Cilacap', 'Cilacap Jawa Tengah',
    'Jawa Tengah', 'Indonesia', 'Desa Digital', 'Pasar Desa', 'Toko Desa',
    'Marketplace Desa', 'Pemasaran UMKM', 'Pemasaran Produk Desa',
    'Produk Pertanian Desa', 'Kerajinan Lokal', 'Kerajinan Tangan Desa',
    'Kuliner Lokal', 'Makanan Khas Desa', 'Hasil Bumi Desa', 'Hasil Pertanian',
    'Ekonomi Lokal', 'Inovasi Desa', 'Program Desa', 'Potensi Desa',
    'Pengembangan Desa', 'Produk Kreatif Desa', 'Bisnis Desa',
    'Pusat Oleh-oleh Desa', 'Oleh-oleh Lokal', 'Wisata Desa',
    'Produk Pertanian Kutabima', 'Hasil Bumi Kutabima', 'Hasil Alam Desa',
    'Produk Kearifan Lokal', 'Kearifan Lokal', 'Budaya Desa',
    'Pemberdayaan Ekonomi Lokal', 'Belanja UMKM', 'Belanja Lokal',
    'Penguatan UMKM', 'Penguatan Ekonomi Desa', 'Pemerintah Desa Kutabima',
    'Potensi Ekonomi Kutabima', 'Produk Rumahan', 'Home Industry Desa',
    'Industri Rumahan', 'Kerajinan Desa Kutabima', 'Pasar Lokal',
    'E-commerce Desa', 'Website UMKM Desa', 'Digitalisasi UMKM',
    'Digitalisasi Desa', 'Katalog Produk Desa', 'Produk Komunitas Lokal'
  ],
  authors: [{ name: '' }, { name: '', url: '' }],
  creator: '',
  publisher: '',
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartProvider>
            <Header />
            <div id="page-content">{children}</div>
            <Footer />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}