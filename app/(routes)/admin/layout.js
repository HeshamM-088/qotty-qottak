import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "./_components/side_bar/SideBar";
import MobileSidebar from "./_components/side_bar/MobileSidebar";
import UnauthorizedPage from "./_components/404/UnauthorizedPage";

const DashboardLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return (
      <UnauthorizedPage
        pageName="صفحه اداره الموقع"
        loginMessage="تسجيل الدخول بحساب اخر"
      />
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="p-4 border-b flex items-center gap-4">
          <MobileSidebar />
          <h2 className="font-bold">إدارة النظام</h2>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
