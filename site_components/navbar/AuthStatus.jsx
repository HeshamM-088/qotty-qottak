"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { fetchUser, logout } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, UserStar } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const AuthStatus = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("حدث خطأ أثناء تسجيل الخروج");

      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تسجيل الخروج، حاول مرة أخرى", {});
    }
  };

  if (status === "loading") return <p>جاري التحميل...</p>;

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" /> الملف الشخصي
        </DropdownMenuItem>
        {user.role === "admin" && (
          <DropdownMenuItem onClick={() => router.push("/admin")}>
            <UserStar className="mr-2 h-4 w-4" /> لوحه التحكم
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button
      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
      onClick={() => router.push("/login")}
    >
      تسجيل الدخول
    </Button>
  );
};

export default AuthStatus;
