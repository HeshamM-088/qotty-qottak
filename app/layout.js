import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import Header from "@/site_components/navbar/Header";
import Footer from "@/site_components/Footer";
import { Toaster } from "react-hot-toast";
import ClientProviders from "./ClientProviders";
import Chatbot from "@/site_components/chatbot/Chatbot";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://qotty-qottak.vercel.app"),

  title: "قطتي-قطتك | منصة تبني القطط الأكبر في مصر",
  description:
    "قطتي - قطتك منصة عربية لتبني القطط في مصر. تصفح قطط مطعمة وجاهزة للتبني وتواصل مباشرة مع أصحابها بسهولة وأمان.",
  keywords: [
    "تبني قطط",
    "قطط للتبني",
    "تبني قطط في مصر",
    "قطط مطعمة",
    "تبني حيوانات أليفة",
  ],
  openGraph: {
    title: "قطتي - قطتك | تبني القطط في مصر",
    description: "منصة عربية لتبني القطط المطعمة في مصر بسهولة وأمان",
    locale: "ar_EG",
    type: "website",
  },

  generator: "Hisham Khalil",
  author: "Hisham Khalil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${tajawal.variable} ${cairo.variable} antialiased cursor-cat`}
      >
        <ClientProviders>
          <Header />
          {children}

          <Chatbot />
          <Toaster position="bottom-left" />
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
