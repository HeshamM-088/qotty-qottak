"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      <main className="flex-1 flex items-center justify-center bg-muted/30 py-12 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32 blur-3xl" />

        <Card className="w-full rounded-4xl max-w-md border-none shadow-2xl relative z-10 backdrop-blur-sm bg-card/80">
          <Image
            fill
            src="/login/look2.png"
            priority
            sizes="220px"
            alt="Cute cat looking at the form"
            className="opacity-10 rounded-4xl drop-shadow-2xl pointer-events-none select-none"
          />
          <CardHeader className="text-center space-y-1">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-serif text-3xl font-bold tracking-tight">
              تسجيل الدخول
            </CardTitle>
            <p className="text-muted-foreground">
              أهلاً بك مجدداً في مجتمع قطتي-قطتك
            </p>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  className="pr-10 text-right bg-background/50 border-muted-foreground/20 focus:border-primary transition-all"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور</Label>
                <Link
                  href="#"
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  className="pr-10 text-right bg-background/50 border-muted-foreground/20 focus:border-primary transition-all"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Button className="w-full cursor-pointer py-6 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0">
              دخول
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pb-8">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  أو تابع عبر
                </span>
              </div>
            </div>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">ليس لديك حساب؟ </span>
              <Link
                href="/signup"
                className="text-primary font-bold hover:underline decoration-2 underline-offset-4"
              >
                إنشاء حساب جديد
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Login;
