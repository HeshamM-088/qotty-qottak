import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, CheckCircle2, PlusCircle } from "lucide-react";
import Image from "next/image";

const Home = async () => {
  const featuredCats = [
    {
      id: 1,
      name: "مشمش",
      breed: "بلدي",
      age: "سنة واحدة",
      image: "/temp_static/pexels-chevonrossouw-2558605.jpg",
      gender: "ذكر",
    },
    {
      id: 2,
      name: "لولي",
      breed: "شيرازي",
      age: "6 شهور",
      image: "/temp_static/pexels-ingewallu-177809.jpg",
      gender: "أنثى",
    },
    {
      id: 3,
      name: "بندق",
      breed: "رومي",
      age: "سنتين",
      image: "/temp_static/pexels-kowalievska-1170986.jpg",
      gender: "ذكر",
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full py-16">
        <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12">
          {/* النصوص */}
          <div className="lg:w-1/2 text-right space-y-6 xl:space-y-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              قطتي–قطتك | منصة تبني القطط في مصر
            </h1>
            <span className="block text-primary text-2xl md:text-3xl font-semibold">
              كل قطة تستحق منزلاً دافئاً وحياة سعيدة
            </span>
            <p className="text-muted-foreground text-lg md:text-xl">
              قطتي–قطتك هو موقع عربي متخصص في تبني القطط داخل مصر، يهدف إلى
              تسهيل عملية التبني بطريقة إنسانية وآمنة، من خلال عرض قطط مطعمة
              وجاهزة للتبني والتواصل المباشر بين أصحاب القطط والمتبنين.
            </p>

            <div className="flex flex-wrap gap-4 justify-start">
              <Link href="/cats">
                <Button size="lg" className="h-12 px-8 gap-2">
                  <Search className="h-5 w-5" />
                  تصفح القطط المتاحة
                </Button>
              </Link>
              <Link href="/add-cat">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 gap-2 bg-transparent"
                >
                  <PlusCircle className="h-5 w-5" />
                  اعرض قطة للتبني
                </Button>
              </Link>
            </div>
          </div>

          {/* الصورة */}
          <div className="lg:w-1/2 relative w-full h-96 lg:h-125 rounded-3xl overflow-hidden shadow-2xl shadow-border ">
            <Image
              src="/hero/3.jpg"
              alt="ست حاضنة قطط مبسوطة"
              fill
              sizes="(max-width: 768px) 100vw, 
           (max-width: 1200px) 50vw, 
           33vw"
              priority={true}
              className="object-cover rounded-3xl hover:p-64"
            />
            {/* Overlay شفاف إذا حبيت النص يظهر أفضل */}
            <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">+500</p>
              <p className="text-sm font-medium text-muted-foreground">
                قطة تم تبنيها
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">+1200</p>
              <p className="text-sm font-medium text-muted-foreground">
                مستخدم مسجل
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">+50</p>
              <p className="text-sm font-medium text-muted-foreground">
                إضافة يومية
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">100%</p>
              <p className="text-sm font-medium text-muted-foreground">
                مجاني دائماً
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold">قطط تنتظر منزلاً</h2>
              <p className="text-muted-foreground text-pretty">
                إليك بعض القطط الجميلة التي تبحث عن عائلة محبة
              </p>
            </div>
            <Link
              href="/cats"
              className="hidden md:flex items-center text-primary font-bold hover:underline gap-1"
            >
              مشاهدة الكل
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCats.map((cat) => (
              <div
                key={cat.id}
                className="group bg-card rounded-2xl overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-square">
                  <Image
                    src={cat.image || "/placeholder.svg"}
                    alt={cat.name}
                    sizes="50vw"
                    loading="eager"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {cat.breed}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{cat.name}</h3>
                    <span className="text-sm font-medium text-muted-foreground">
                      {cat.gender}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">
                    {cat.age}
                  </p>
                  <Link href={`/cats/${cat.id}`}>
                    <Button className="w-full rounded-xl cursor-pointer">
                      تفاصيل التبني
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 md:hidden">
            <Link href="/cats">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                مشاهدة كل القطط
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="py-20 bg-muted/50 overflow-hidden relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(54, 101, 108, 0.6), rgba(54, 101, 108, 0.6)), url('/hero/2.jpg')`,
        }}
      >
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 ">كيف تعمل المنصة؟</h2>
            <p className="">
              ثلاث خطوات بسيطة لبدء رحلة التبني أو إنقاذ حياة قطة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector lines (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-border -z-10" />

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-background border-4 border-primary flex items-center justify-center text-3xl font-bold text-primary shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold">ابحث وتصفح</h3>
              <p className=" text-pretty">
                تصفح القطط المعروضة للتبني حسب المدينة والحالة الصحية
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-background border-4 border-primary flex items-center justify-center text-3xl font-bold text-primary shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold">أختار مباشرة</h3>
              <p className=" text-pretty">
                اختر القطة المناسبة لك واطلع على تفاصيلها وصورها
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-background border-4 border-primary flex items-center justify-center text-3xl font-bold text-primary shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold">أتمم التبني</h3>
              <p className=" text-pretty">
                تواصل مباشرة مع صاحب القطة عبر واتساب لإتمام التبني
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/temp_static/pexels-shvetsa-3846135.jpg"
                alt="منصة آمنة"
                sizes="50vw"
                loading="eager"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  منصة آمنة لكل محبي القطط
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  نحن نهتم بسلامة القطط بقدر ما نهتم بتوفير منزل لها. تتبع
                  المنصة معايير صارمة لضمان أن عملية التبني تتم بمسؤولية.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  "التحقق من هوية المعلنين والمتبنين",
                  "التشجيع على التبني المجاني ورفض البيع",
                  "توفير نصائح طبية وسلوكية شاملة",
                  "مجتمع نشط للإبلاغ عن أي سوء معاملة",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </div>

              <Link href="/about">
                <Button
                  variant="outline"
                  className="gap-2 bg-transparent cursor-pointer"
                >
                  اعرف المزيد عن مهمتنا
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* App Promo / Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="bg-primary rounded-4xl p-8 md:p-16 text-primary-foreground relative overflow-hidden bg-fixed bg-center bg-cover"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(54, 101, 108, 0.6), rgba(54, 101, 108, 0.6)), url('/hero/contact.jpg')`,
            }}
          >
            <div className="max-w-2xl relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold">
                لا تفوت فرصة العثور على صديقك
              </h2>
              <p className="text-primary-foreground/90 text-xl">
                اشترك في قائمتنا البريدية لتصلك إشعارات فورية عند إضافة قطط
                جديدة في منطقتك.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-6 py-3 rounded-xl bg-primary-foreground text-foreground outline-none border-none"
                />
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-xl cursor-pointer px-8 font-bold"
                >
                  اشترك الآن
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
