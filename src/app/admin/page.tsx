import { getAllProducts } from "@/lib/actions/products"
import { getAllGalleries } from "@/lib/actions/galleries"
import AdminClient from "@/components/ui/admin/AdminClient"
import PageTransition from "@/components/PageTransition"
import type { Metadata, Viewport } from "next"
import { cookies } from "next/headers"
import font from "@/lib/font"
import { verifyToken } from "@/lib/auth"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard BUMDES",
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

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  const loginStatus = token ? verifyToken(token) : false

  // Fetch initial data server-side
  const initialProducts = await getAllProducts()
  const initialGalleries = await getAllGalleries()

  return (
    <PageTransition>
      <main className={`relative h-full min-h-screen w-full bg-primary-foreground ${font.primary}`}>
        <AdminClient loginStatus={loginStatus} initialProducts={initialProducts} initialGalleries={initialGalleries} />
      </main>
    </PageTransition>
  )
}
/* 
const cookieStore = await cookies();
  const origin = process.env.MAIN_WEBSITE_ORIGIN;
  const apikey = process.env.API_KEY;
  const secretKey = process.env.SECRET_KEY;

  // Validate environment variables
  if (!origin || !apikey || !secretKey) {
    console.error("Missing environment variables");
    return <AuthError message="Server configuration error. Please contact support." />;
  }

  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("id")?.value;
  const loginStatus = token ? await verifyToken(token) : false

  if(!loginStatus || !userId) {
    return <AuthError redirectPath={"/login?callbackurl=/dashboard"} message="Missing or invalid session data. Please log in again." />;
  } else if (loginStatus) {
    const decryptedUserId = await decryptString(userId, secretKey);
    const userData = await getUserData(decryptedUserId, origin, apikey);
    if (!userData.success || !userData.data) {
      return <AuthError redirectPath={"/login?callbackurl=/dashboard"} title="Login Error" message="Failed to retrieve user data. Please try again." />;
    }
    return (
      <PageTransition>
        <main className={font.primary}>
          <Toaster />
          <DashboardClient apikey={apikey} origin={origin} user={userData.data} categories={(await getCategory(origin, apikey)).categories} />
        </main>
      </PageTransition>
    );
  }
*/