import { getServerSession } from "next-auth";
import ChartsSection from "./_components/charts_section/ChartsSection";
import CatsStatsCard from "./_components/stats_cards/components/CatsStatsCard";
import RequestsStatsCard from "./_components/stats_cards/components/RequestsStatsCard";
import UsersStatsCard from "./_components/stats_cards/components/UsersStatsCard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllRequests } from "@/backend/services/adopt.service";
import { getAllCatsAdmin } from "@/backend/services/cat.service";
import { getAllUsersAdmin } from "@/backend/services/user.service";

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

const getAdoptRequestsInfo = async () => {
  const { user } = await getServerSession(authOptions);

  const req = await getAllRequests(user);

  const res = await req.json();

  return res;
};

const getCatsInfo = async () => {
  const req = await getAllCatsAdmin();

  const cats = req.json();

  return cats;
};

const getUsersInfo = async () => {
  const { user } = await getServerSession(authOptions);

  const req = await getAllUsersAdmin(user);

  const users = req.json();

  return users;
};

const DashboardPage = async () => {
  const [requests, cats, users] = await Promise.allSettled([
    getAdoptRequestsInfo(),
    getCatsInfo(),
    getUsersInfo(),
  ]);

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

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        <CatsStatsCard cats={cats?.value.data} />
        <UsersStatsCard users={users?.value.data} />
        <RequestsStatsCard requests={requests?.value.data} />
      </div>

      <ChartsSection cats={cats?.value.data} requests={requests?.value.data} />
    </div>
  );
};

export default DashboardPage;
