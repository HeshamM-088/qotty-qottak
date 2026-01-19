import Link from "next/link";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UnauthorizedPage = ({ pageName, loginMessage }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>

          <CardTitle className="text-2xl font-bold">غير مصرح بالدخول</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            عذرًا، ليس لديك الصلاحيات اللازمة للوصول إلى {pageName}. إذا كنت
            تعتقد أن هذا خطأ، يرجى التواصل مع إدارة النظام.
          </p>

          <div className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/">
                الرجوع إلى الصفحة الرئيسية
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="secondary" className="w-full">
              <Link href="/login">{loginMessage}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
