"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Cat } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/redux/slices/userSlice";

const GoogleSuccess = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser())
      .then(() => {
        router.replace("/");
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm bg-card/80 backdrop-blur rounded-3xl shadow-2xl p-8 text-center space-y-6">
        <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
          <Cat className="w-7 h-7 text-primary" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold">أهلاً بك 🐾</h2>
          <p className="text-sm text-muted-foreground">جاري تسجيل الدخول</p>
        </div>

        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>

        <p className="text-xs text-muted-foreground">لحظة واحدة من فضلك...</p>
      </div>
    </div>
  );
};

export default GoogleSuccess;
