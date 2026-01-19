import { Card } from "@/components/ui/card";
import { Heart, ShieldCheck, Users, Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "من نحن | قطتي-قطتك",
  description:
    "تعرف على منصة قطتي - قطتك، المنصة العربية المتخصصة في تبني القطط داخل مصر ونشر ثقافة العناية بالقطط والتبني المسؤول.",
  keywords: [
    "تبني القطط",
    "تبني القطط في مصر",
    "العناية بالقطط",
    "رعاية الحيوانات الأليفة",
    "قطط للتبني",
  ],
  openGraph: {
    title: "من نحن | قطتي - قطتك",
    description:
      "منصة عربية لتسهيل تبني القطط في مصر ونشر الوعي بالعناية بالقطط والتبني المسؤول.",
    locale: "ar_EG",
    type: "website",
  },
};

const AboutPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Mission Section */}
        <section className="bg-primary/5 py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              رؤيتنا ومهمتنا
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              <strong>قطتي–قطتك</strong> هي منصة عربية متخصصة في تبني القطط داخل
              مصر، هدفنا هو تسهيل عملية التبني وربط الأشخاص الراغبين في تبني
              القطط بالأشخاص الذين يبحثون عن منزل آمن ومحِب لقططهم.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Heart,
                  title: "الرفق بالحيوان",
                  desc: "نؤمن أن كل قطة تستحق الحب والرعاية في منزل دافئ وآمن.",
                },
                {
                  icon: ShieldCheck,
                  title: "الأمان والثقة",
                  desc: "نحرص على مراجعة المحتوى والتأكد من جدية المتبنين لحماية القطط.",
                },
                {
                  icon: Users,
                  title: "المسؤولية المجتمعية",
                  desc: "نسعى لرفع الوعي بأهمية التبني والاعتناء بالحيوانات الأليفة في مصر.",
                },
              ].map((value, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-bold">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact info */}
        <section id="contact" className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden border-none shadow-sm">
              <div className="grid lg:grid-cols-2">
                <div className="bg-primary p-8 text-primary-foreground md:p-12">
                  <h2 className="mb-6 font-serif text-3xl font-bold">
                    رأيك يهمنا
                  </h2>
                  <p className="mb-8 opacity-90">
                    لديك استفسار أو اقتراح؟ يسعدنا دائماً سماع رأيك والمساعدة في
                    أي وقت.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5" />
                      <span>heshamkhalil1988@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5" />
                      <span>4463 955 111 02+</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="h-5 w-5" />
                      <span>القاهرة، مصر</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">الاسم</label>
                        <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          البريد الإلكتروني
                        </label>
                        <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الرسالة</label>
                      <textarea className="min-h-30 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    </div>
                    <button className="w-full rounded-md bg-primary px-8 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                      إرسال الرسالة
                    </button>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
