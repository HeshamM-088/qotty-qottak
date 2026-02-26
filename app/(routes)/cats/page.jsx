import { getAllCats } from "@/backend/services/cat.service";
import CatsFilters from "./_catsFilters/CatsFilters";
import CatsGrid from "./_catsGrid/CatsGrid";

export const metadata = {
  title: "استعرض القطط وابحث عن قطتك المثالية | قطتي - قطتك",
  description:
    "استعرض جميع القطط الجاهزة للتبني في مصر بسهولة، وابحث عن القطة المناسبة لك وفق العمر، الجنس، والحالة الصحية. تبني القطط أصبح أسهل مع قطتي – قطتك.",
  keywords: [
    "قطط للتبني",
    "تبني القطط في مصر",
    "البحث عن قطط",
    "قطط مطعمة",
    "رعاية القطط",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "استعرض القطط وابحث عن قطتك المثالية | قطتي - قطتك",
    description:
      "اكتشف جميع القطط الجاهزة للتبني في مصر وابحث عن القطة التي تناسبك بسهولة وسرعة.",
    locale: "ar_EG",
    type: "website",
    url: "https://qatty-qattek.vercel.app/cats",
  },
  twitter: {
    card: "summary_large_image",
    title: "استعرض القطط وابحث عن قطتك المثالية | قطتي - قطتك",
    description:
      "اكتشف جميع القطط الجاهزة للتبني في مصر وابحث عن القطة التي تناسبك بسهولة وسرعة.",
  },
  generator: "Hisham Khalil",
  author: "Hisham Khalil",
};

const getCats = async () => {
  const request = await getAllCats();
  const res = await request.json();

  return res;
};

const CatsPage = async () => {
  const { data: cats } = await getCats();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-muted/30 pb-20 pt-10">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-3xl font-bold text-center md:text-right">
            تصفح القطط المتاحة للتبني
          </h1>
          <p className="text-muted-foreground mb-8 text-center md:text-right">
            هناك {cats.length} قطة بانتظار عائلة جديدة
          </p>

          {/* Client Components */}
          <CatsFilters cats={cats} />
          <CatsGrid cats={cats} />
        </div>
      </main>
    </div>
  );
};

export default CatsPage;
