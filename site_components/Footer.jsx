import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="mb-4 inline-block font-serif text-2xl font-bold text-primary"
            >
              قطتي–قطتك
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              أول منصة مصرية متخصصة لتسهيل عملية تبني القطط بشكل آمن ومجاني.
              نؤمن أن كل قطة تستحق حياة كريمة ومنزل دافئ.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-bold">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/cats" className="hover:text-primary">
                  تصفح القطط
                </Link>
              </li>
              <li>
                <Link href="/add-cat" className="hover:text-primary">
                  أضف قطة للتبني
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-primary">
                  دليل التبني
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  عن المنصة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">الدعم والمساعدة</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about#contact" className="hover:text-primary">
                  تواصل معنا
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  شروط الاستخدام
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">تابعنا على</h3>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              اشترك في القائمة البريدية ليصلك جديد القطط المتاحة للتبني.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} منصة قطتي–قطتك. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
