import ChartsSection from "./_components/charts_section/ChartsSection";
import StatsCard from "./_components/stats_cards/StatsCard";

export const metadata = {
  title: "لوحة تحكم الأدمن | منصة قطتى-قطتك",
  description:
    "لوحة تحكم إدارية لإدارة القطط وطلبات التبنّي والمستخدمين داخل منصة قطتى-قطتك.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },

  applicationName: "منصة قطتى-قطتك",

  authors: [{ name: "Hisham Medhat Mohamed Khalil" }],

  generator: "Next.js",

  category: "الإدارة",

  metadataBase: new URL("https://qotty-qottak.vercel.app"),

  openGraph: {
    title: "لوحة تحكم الأدمن | منصة قطتى-قطتك",
    description: "واجهة إدارية آمنة لإدارة المحتوى والمستخدمين وطلبات التبنّي.",
    url: "https://qotty-qottak.vercel.app/admin",
    siteName: "منصة قطتى-قطتك",
    type: "website",
    locale: "ar_EG",
  },

  twitter: {
    card: "summary",
    title: "لوحة تحكم الأدمن | منصة قطتى-قطتك",
    description: "لوحة تحكم خاصة لإدارة منصة قطتى-قطتك.",
  },

  other: {
    "ai-content-type": "واجهة-إدارية",
    "ai-access-level": "خاص",
    "ai-purpose": "إدارة-المحتوى",
    "content-language": "ar",
  },
};

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          نظرة عامة على الداشبورد
        </h1>
        <p className="text-muted-foreground mt-2">
          مرحبا بك في لوحة التحكم الإدارية لقطتي-قطتك
        </p>
      </div>

      <StatsCard />
      <ChartsSection />
    </div>
  );
};

export default DashboardPage;
