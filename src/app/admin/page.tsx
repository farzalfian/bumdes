import PageTransition from "@/components/PageTransition"
import AdminClient from "@/components/ui/admin/AdminClient"
import type { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "Admin",
  description: "",
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

export default function Page() {
  return (
    <PageTransition>
      <AdminClient />
    </PageTransition>
  )
}
