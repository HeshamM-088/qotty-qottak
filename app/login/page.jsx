"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* Animations */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const scaleFade = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    }, 900);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-background via-muted/40 to-background px-4 overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-16 text-center"
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-extrabold tracking-wide"
            >
              قطتي-قطتك
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 10 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-muted-foreground"
            >
              لأنهم يستحقون حياة أفضل
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!loading ? (
          <motion.div
            key="card"
            variants={scaleFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="w-full max-w-md z-10"
          >
            <Card className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-card/80 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
              <Image
                src="/login/look2.png"
                alt="Cat illustration"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                priority
                className="object-cover opacity-[0.07] pointer-events-none"
              />

              <CardHeader className="pt-16 text-center space-y-4">
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl font-extrabold"
                >
                  تجربة راقية تبدأ من هنا
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  className="text-sm text-muted-foreground max-w-xs mx-auto"
                >
                  دخول آمن وسريع باستخدام حساب Google
                </motion.p>
              </CardHeader>

              <CardContent className="pt-10 px-8 space-y-8">
                <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    onClick={handleGoogleLogin}
                    className="w-full h-14 rounded-2xl text-lg font-semibold
                    bg-linear-to-r from-primary to-primary/90
                    shadow-[0_20px_60px_rgba(0,0,0,0.35)] cursor-pointer"
                  >
                    <FcGoogle className="w-6 h-6 mr-2 bg-white rounded-full p-0.5" />
                    تسجيل دخول باستخدام Google
                  </Button>
                </motion.div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  لن نقوم بنشر أي شيء بدون إذنك
                </div>
              </CardContent>

              <CardFooter className="pb-10 text-center text-xs text-muted-foreground">
                <p>
                  بالمتابعة أنت توافق على{" "}
                  <Link href="#" className="underline">
                    الشروط
                  </Link>{" "}
                  و{" "}
                  <Link href="#" className="underline">
                    سياسة الخصوصية
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
              className="w-14 h-14 border-4 border-primary/30 border-t-primary rounded-full"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              جاري تأمين تسجيل الدخول…
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
