import CatsTable from "../_components/cats_table/CatsTable";

export const metadata = {
  title: "لوحة إداره القطط | منصة قطتى-قطتك",
  description:
    "لوحة إداره القطط لإدارة القطط وطلبات التبنّي والمستخدمين داخل منصة قطتى-قطتك.",

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
    title: "لوحة إداره القطط | منصة قطتى-قطتك",
    description: "واجهة إدارية آمنة لإدارة المحتوى والمستخدمين وطلبات التبنّي.",
    url: "https://qotty-qottak.vercel.app/admin/cats",
    siteName: "منصة قطتى-قطتك",
    type: "website",
    locale: "ar_EG",
  },

  twitter: {
    card: "summary",
    title: "لوحة إداره القطط | منصة قطتى-قطتك",
    description: "لوحة تحكم خاصة لإدارة منصة قطتى-قطتك.",
  },

  other: {
    "ai-content-type": "واجهة-إدارية",
    "ai-access-level": "خاص",
    "ai-purpose": "إدارة-المحتوى",
    "content-language": "ar",
  },
};

const CatsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة القطط</h1>
          <p className="text-muted-foreground mt-2">
            إضافة وتعديل وحذف القطط المتاحة للتبني
          </p>
        </div>
      </div>

      <CatsTable />
    </div>
  );
};

export default CatsPage;
