"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { fetchUser, logout } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, UserStar } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { setUser, logout as logoutSlice } from "@/redux/slices/userSlice";

const AuthStatus = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setUser({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          role: session.user.role,
          image: session.user.image,
        }),
      );
    } else {
      dispatch(logoutSlice());
    }
  }, [session?.user?.id, session?.user?.role]);

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      dispatch(logoutSlice());
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تسجيل الخروج، حاول مرة أخرى");
    }
  };

  if (status === "loading") return <p>جاري التحميل...</p>;

  const user = session?.user;

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user.image || "/placeholder.svg"}
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
