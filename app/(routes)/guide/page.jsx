import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MessageCircleQuestionMark,
  Shield,
  Apple,
  Ambulance,
  MessageCircleHeart,
  BrushCleaning,
} from "lucide-react";

export const metadata = {
  title: "دليل تبني القطط والعناية بها | قطتي-قطتك",
  description:
    "تعلم خطوات تبني القطة بطريقة صحيحة ونصائح العناية بالقطط لضمان صحتها وسعادتها. دليل شامل للمبتدئين داخل مصر.",
  keywords: [
    "تبني القطط",
    "رعاية القطط",
    "كيفية العناية بالقطط",
    "قطط للتبني في مصر",
    "دليل تبني القطط",
    "نصائح القطط",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "دليل تبني القطط والعناية بها | قطتي - قطتك",
    description:
      "دليل شامل خطوة بخطوة لتبني القطط والعناية بها داخل مصر بطريقة آمنة وصحية.",
    locale: "ar_EG",
    type: "website",
    url: "https://qatty-qattek.vercel.app/guide",
  },
  twitter: {
    card: "summary_large_image",
    title: "دليل تبني القطط والعناية بها | قطتي - قطتك",
    description:
      "دليل شامل خطوة بخطوة لتبني القطط والعناية بها داخل مصر بطريقة آمنة وصحية.",
  },
  generator: "Hisham Khalil",
  author: "Hisham Khalil",
};

const GuidePage = () => {
  const careTips = [
    {
      title: "التغذية السليمة",
      icon: Apple,
      content: `استخدم أكل مخصص للقطط
                وفر مياه نظيفة دائمًا
                تجنب الأكل البشري الضار
                التغذية الصح = صحة أفضل.`,
    },
    {
      title: "النظافة الشخصية",
      icon: Shield,
      content: `
      تنظيف صندوق الرمل بانتظام
تمشيط الشعر خاصة للقطط طويلة الشعر
قص الأظافر عند الحاجة
النظافة تقلل التوتر والأمراض.
      `,
    },
    {
      title: "الرعاية البيطرية",
      icon: Ambulance,
      content: `
        تطعيمات دورية
فحص سنوي
علاج فوري لأي أعراض غير طبيعية
الوقاية دائمًا أفضل من العلاج.
      `,
    },
    {
      title: "الاهتمام النفسي واللعب",
      icon: MessageCircleHeart,
      content: `خصص وقت للعب يوميًا
وفر ألعاب تحفّز الحركة
لا تترك القطة وحيدة لفترات طويلة
اللعب مهم للصحة النفسية.
      `,
    },
    {
      title: "التعقيم (إن أمكن)",
      icon: BrushCleaning,
      content: `
        يقلل من التكاثر غير المنضبط
يساعد على هدوء القطة
يقلل مشاكل سلوكية
      `,
    },
  ];

  const fqaTips = [
    {
      title: "هل التبني أفضل من الشراء؟",
      content: `نعم، التبني ينقذ حياة قطة ويقلل من التشرد.`,
    },
    {
      title: "هل القطط المتبناة تكون عدوانية؟",
      content: `لا، القطط تتأقلم بسرعة مع الرعاية الجيدة.`,
    },
    {
      title: "هل يمكن تبني قطة إذا كان لدي أطفال؟",
      content: `نعم، يمكن تبني قطة في وجود أطفال، بشرط تعليم الأطفال كيفية التعامل مع القطة بلطف واحترام، وعدم إزعاجها أثناء الأكل أو النوم. اختيار قطة هادئة يساعد على نجاح التجربة.`,
    },
    {
      title: "كم تكلفة تبني قطة في مصر؟",
      content: `في معظم الحالات، تبني القطط يكون مجانًا أو مقابل تكلفة رمزية للمساعدة في التطعيم أو الرعاية الصحية. التبني دائمًا أقل تكلفة من شراء القطط، وأفضل إنسانيًا.`,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 ">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              دليل تبني القطط والعناية بها في مصر
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              اكتشف خطوات تبني القطط ونصائح العناية بها بسهولة من خلال دليلنا
              الكامل للمبتدئين في مصر
            </p>
          </div>

          <Tabs defaultValue="adoption" className="mx-auto max-w-4xl" dir="rtl">
            <TabsList className="grid space-y-2 md:space-y-0 w-full grid-cols-1 bg-muted  mb-24 md:mb-0  md:grid-cols-3">
              <TabsTrigger value="adoption">خطوات التبني</TabsTrigger>
              <TabsTrigger value="care">نصائح العناية</TabsTrigger>
              <TabsTrigger value="fqa">أسئلة شائعة عن تبني القطط</TabsTrigger>
            </TabsList>
            <TabsContent value="adoption" className="pt-8">
              <div className="space-y-6">
                {[
                  "اختيار القطة المناسبة لنمط حياتك من خلال منصتنا.",
                  "التواصل مع صاحب القطة عبر واتساب للتعارف.",
                  "يفضل فحص بيطري أولي",
                  "اختيار القطة الصح = علاقة أنجح.",
                  "توقيع إقرار التبني واستلام القطة.",
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-4 rounded-xl bg-muted/30 p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {i + 1}
                    </div>
                    <p className="leading-relaxed text-base md:text-xl">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="care" className="pt-8">
              <div className="grid gap-6 md:grid-cols-3">
                {careTips.map((tip, i) => (
                  <Card key={i} className="border-none shadow-sm">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <tip.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 font-bold text-base md:text-xl">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed  md:text-base">
                        {tip.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="fqa" className="pt-8">
              <div className="grid gap-6 grid-cols-1">
                {fqaTips.map((tip, i) => (
                  <Accordion key={i} type="single" collapsible>
                    <AccordionItem value="item-1">
                      <MessageCircleQuestionMark color="blue" size={25} />
                      <AccordionTrigger className="cursor-pointer text-base text-right md:text-xl bg- rounded-2xl p-4 text-accent-foreground">
                        {tip.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm md:text-lg text-right">
                        {tip.content}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default GuidePage;
