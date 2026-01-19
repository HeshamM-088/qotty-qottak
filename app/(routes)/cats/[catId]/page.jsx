import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  MapPin,
  CheckCircle2,
  Calendar,
  MessageCircle,
  ShieldCheck,
  AlertCircle,
  Share2,
} from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { catId } = await params;

  const cat = {
    name: "لولو",
    age: "3 شهور",
    city: "القاهرة",
    gender: "female",
    vaccinated: true,
    image: "/temp_static/cats/1 (1).jpg",
  };

  const title = `${cat.name} للتبني في ${cat.city} | قطتي - قطتك`;

  const description = `تبني القطة ${cat.name} عمر ${cat.age}، ${
    cat.gender === "male" ? "ذكر" : "أنثى"
  }، ${cat.vaccinated ? "مطعمة" : "غير مطعمة"} وجاهزة للتبني في ${cat.city}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: "ar_EG",
      type: "article",
      images: [
        {
          url: cat.image,
          width: 1200,
          height: 630,
          alt: `قطة للتبني - ${cat.name}`,
        },
      ],
    },
  };
}

const CatDetailsPage = async () => {
  const cat = {
    id: 1,
    name: "لونا",
    city: "القاهرة (المعادي)",
    age: "6 أشهر",
    gender: "أنثى",
    vaccinated: true,
    breed: "بلدي هجين",
    description: `لونا قطة رقيقة جداً وهادية، بتحب اللعب ومسالمة مع الأطفال والقطط التانية. متعودة على الليتر بوكس وبتاكل دراي فود وفريش فود.

تم إنقاذها من الشارع وهي عندها شهرين، ودلوقتي هي جاهزة تروح لبيت يحبها ويهتم بيها. التطعيمات كلها متسجلة في الدفتر الصحي بتاعها.`,
    images: [
      "/temp_static/cats/1 (1).jpg",
      "/temp_static/cats/1 (1).jpg",
      "/temp_static/cats/1 (1).jpg",
    ],
    owner: {
      name: "أسيل هشام",
      phone: "+201012345678",
      joinDate: "يناير 2022",
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-20 pt-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                الرئيسية
              </Link>
              <span>/</span>
              <Link href="/cats" className="hover:text-primary">
                القطط
              </Link>
              <span>/</span>
              <span className="font-medium text-foreground">{cat.name}</span>
            </nav>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Share2 className="h-4 w-4" />
                مشاركة
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Heart className="h-4 w-4" />
                حفظ
              </Button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Image Gallery & Info (Left/Middle Column) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid gap-4">
                <div className="overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={cat.images[0] || "/placeholder.svg"}
                    alt={cat.name}
                    className="aspect-video w-full object-cover lg:aspect-video"
                  />
                </div>
                <div className="flex gap-4">
                  {cat.images.slice(1).map((img, i) => (
                    <div
                      key={i}
                      className="h-24 w-24 overflow-hidden rounded-lg bg-muted cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${cat.name} gallery ${i}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-3xl font-bold lg:text-4xl">
                    {cat.name}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {cat.city}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      منذ يومين
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-xl bg-muted/50 p-4 text-center">
                    <div className="text-xs text-muted-foreground">النوع</div>
                    <div className="font-bold">{cat.gender}</div>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4 text-center">
                    <div className="text-xs text-muted-foreground">العمر</div>
                    <div className="font-bold">{cat.age}</div>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4 text-center">
                    <div className="text-xs text-muted-foreground">السلالة</div>
                    <div className="font-bold">{cat.breed}</div>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4 text-center">
                    <div className="text-xs text-muted-foreground">تطعيمات</div>
                    <div className="font-bold text-primary">
                      {cat.vaccinated ? "كاملة" : "غير مكتملة"}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="mb-4 font-serif text-2xl font-bold">
                    عن القطة
                  </h2>
                  <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                  <div className="mb-3 flex items-center gap-2 font-bold text-primary">
                    <ShieldCheck className="h-5 w-5" />
                    شروط التبني
                  </div>
                  <ul className="list-inside list-decimal space-y-2 text-sm text-foreground ">
                    <li>التبني متاح فور توقيع اقرار التبنى</li>
                    <li>التعهد بعدم البيع أو التخلي عن القطة</li>
                    <li>القدرة على توفير الرعاية الطبية اللازمة</li>
                    <li>إرسال صور وفيديوهات دورية للمالك السابق للاطمئنان</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar (Right Column) */}
            <div className="space-y-6">
              <Card className="sticky top-24 overflow-hidden border-2 border-primary/10">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-full bg-primary/10">
                      <img
                        src={cat.images[0]}
                        alt={cat.owner.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold">{cat.owner.name}</div>
                      <div className="text-xs text-muted-foreground">
                        عضو منذ {cat.owner.joinDate}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/${cat.owner.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      <Button className="w-full cursor-pointer gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-6 text-lg">
                        <MessageCircle className="h-6 w-6" />
                        تواصل عبر واتساب
                      </Button>
                    </a>
                    <Link href="/request">
                      <Button
                        variant="outline"
                        className="w-full py-6 bg-transparent"
                      >
                        تقديم طلب تبني رسمي
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 flex items-start gap-2 rounded-lg bg-yellow-50 p-3 text-xs text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <p>
                      نصيحة: لا تدفع أي مبالغ مالية مقابل التبني. التبني في
                      منصتنا مجاني تماماً لضمان سلامة القطط.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-serif text-lg font-bold">
                    لماذا تتبنى من منصتنا؟
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        تواصل مباشر وآمن مع أصحاب القطط دون وسيط.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        نراجع البلاغات لضمان خلو المنصة من تجار الحيوانات.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CatDetailsPage;
