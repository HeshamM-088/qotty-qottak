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

const CatsPage = () => {
  const cats = [
    {
      id: 1,
      name: "لونا",
      city: "القاهرة",
      age: "6 أشهر",
      gender: "أنثى",
      vaccinated: true,
      image: "/temp_static/cats/1 (1).jpg",
    },
    {
      id: 2,
      name: "مشمش",
      city: "الإسكندرية",
      age: "8 أشهر",
      gender: "ذكر",
      vaccinated: true,
      image: "/temp_static/cats/1 (2).jpg",
    },
    {
      id: 3,
      name: "سنووايت",
      city: "الجيزة",
      age: "3 أشهر",
      gender: "أنثى",
      vaccinated: false,
      image: "/temp_static/cats/1 (3).jpg",
    },
    {
      id: 4,
      name: "فيلو",
      city: "القاهرة",
      age: "8 أشهر",
      gender: "ذكر",
      vaccinated: true,
      image: "/temp_static/cats/1 (4).jpg",
    },
    {
      id: 5,
      name: "زيتونة",
      city: "المنصورة",
      age: "24 شهرا",
      gender: "أنثى",
      vaccinated: true,
      image: "/temp_static/cats/1 (5).jpg",
    },
    {
      id: 6,
      name: "بندق",
      city: "طنطا",
      age: "4 أشهر",
      gender: "ذكر",
      vaccinated: false,
      image: "/temp_static/cats/1 (6).jpg",
    },
    {
      id: 7,
      name: "بيلا",
      city: "القاهرة",
      age: "4 أشهر",
      gender: "أنثى",
      vaccinated: true,
      image: "/temp_static/cats/1 (7).jpg",
    },
    {
      id: 8,
      name: "سمسم",
      city: "الإسكندرية",
      age: "18 شهر",
      gender: "ذكر",
      vaccinated: true,
      image: "/temp_static/cats/1 (8).jpg",
    },
  ];

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
