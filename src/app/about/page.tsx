import PageTransition from "@/components/PageTransition"
import type { Metadata, Viewport } from "next"
import AboutContactClient from "./AboutContactClient"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#556B2F",
}

export const metadata: Metadata = {
  title: "Tentang Kami & Kontak - BUMDES",
  description: "Badan Usaha Milik Desa yang berdedikasi untuk mengembangkan potensi ekonomi lokal dan memberdayakan masyarakat desa. Hubungi kami untuk informasi lebih lanjut atau kemitraan.",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#556B2F",
    "msapplication-tap-highlight": "no",
  },
}

export default function Page() {
  return (
    <PageTransition>
      <AboutContactClient />
    </PageTransition>
  )
}