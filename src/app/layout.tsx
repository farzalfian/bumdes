import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { CartProvider } from "@/context/CartContext"

export const metadata: Metadata = {
  title: {
    template: '%s | ',
    default: ''
  },
  description: "",
  icons: [{ rel: 'shortcut icon', url: "/favicon.ico" }],
  generator: 'Next.js',
  applicationName: '',
  referrer: 'origin-when-cross-origin',
  keywords: ['', '', '', '', ''],
  authors: [{ name: '' }, { name: '', url: '' }],
  creator: '',
  publisher: '',
  formatDetection: {
    email: false,
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
    <html lang="en">
      <body className={`overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartProvider>
            <Header />
            <div id="page-content">{children}</div>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}