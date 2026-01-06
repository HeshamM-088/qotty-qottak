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
import { User, Mail, Lock, UserPlus, CheckCircle2, Camera } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const SignUp = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors  duration-300">
      <main className="flex-1 flex items-center justify-center bg-muted/30  py-12 px-4 relative overflow-hidden">
        <Card className="w-full rounded-4xl max-w-md border-none shadow-2xl relative z-10  backdrop-blur-sm bg-card/80">
          <Image
            fill
            priority
            sizes="220px"
            src="/login/pexels-photo4passion-1828875.jpg"
            alt="Cute cat looking at the form"
            className="opacity-15 drop-shadow-2xl pointer-events-none select-none rounded-4xl"
          />
          <CardHeader className="text-center space-y-1">
            <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
              <UserPlus className="w-6 h-6 text-secondary" />
            </div>
            <CardTitle className="font-serif text-3xl font-bold tracking-tight">
              إنشاء حساب
            </CardTitle>
            <p className="text-muted-foreground">
              انضم إلينا وساعد في تغيير حياة قطة
            </p>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            {/* Image Upload */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <label htmlFor="image" className="cursor-pointer group">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-muted flex items-center justify-center bg-muted">
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>

                  <div className="absolute bottom-0 right-0 bg-secondary p-1.5 rounded-full shadow-md group-hover:scale-110 transition">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </label>

                {/* زر حذف الصورة */}
                {preview && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute cursor-pointer z-50 -top-2 -left-2 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600 transition"
                  >
                    ✕
                  </button>
                )}
              </div>

              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <span className="text-xs text-muted-foreground">
                صورة الملف الشخصي
              </span>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">الاسم بالكامل</Label>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="هشام خليل"
                  className="pr-10 text-right bg-background/50 border-muted-foreground/20 focus:border-secondary transition-all"
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  className="pr-10 text-right bg-background/50 border-muted-foreground/20 focus:border-secondary transition-all"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  className="pr-10 text-right bg-background/50 border-muted-foreground/20 focus:border-secondary transition-all"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse text-xs text-muted-foreground px-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              <span>أوافق على شروط الاستخدام وسياسة الخصوصية</span>
            </div>

            <Button className="w-full cursor-pointer py-6 text-lg font-bold bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20">
              إنشاء الحساب
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pb-8">
            <div className="text-center text-sm">
              <span className="text-muted-foreground">لديك حساب بالفعل؟ </span>
              <Link
                href="/login"
                className="text-secondary font-bold hover:underline"
              >
                تسجيل الدخول
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default SignUp;
