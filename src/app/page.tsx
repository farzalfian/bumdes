import PageTransition from "@/components/PageTransition"
import HomeClient from "@/components/HomeClient"
import font from "@/lib/font"
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
  title: "Beranda",
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  const page = typeof params.page === "string" ? Number(params.page) : 1
  const pageSize = typeof params.max === "string" ? Number(params.max) : 4

  return (
    <PageTransition>
      <main className={`relative min-h-screen w-full bg-primary-foreground ${font.primary}`}>
        <HomeClient
          products={[]}
          total={0}
          currentPage={page}
          pageSize={pageSize}
        />
      </main>
    </PageTransition>
  )
}
