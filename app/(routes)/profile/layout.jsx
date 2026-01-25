import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import UnauthorizedPage from "../admin/_components/404/UnauthorizedPage";

const ProfileLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <UnauthorizedPage
        pageName="الصفحه الشخصيه للمستخدم"
        loginMessage="تسجيل الدخول"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-chart-2 shadow p-4">
        <h1 className="text-2xl font-bold text-white">صفحتي الشخصية</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default ProfileLayout;
