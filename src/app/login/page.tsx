import LoginClient from "@/components/LoginClient"
import PageTransition from "@/components/PageTransition"
import type { Viewport, Metadata } from "next"
import font from "@/lib/font";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "Login",
  description: "Login untuk autentikasi",
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
    "msapplication-TileColor": "#f4f4f4",
    "msapplication-tap-highlight": "no",
  },
}

export default function LoginPage() {
  return (
    <PageTransition>
      <main className={`relative h-full min-h-screen w-full bg-primary-foreground ${font.primary}`}>
        <LoginClient />
      </main>
    </PageTransition>
  )
}
