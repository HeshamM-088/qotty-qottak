import { cookies } from "next/headers";
import Sidebar from "./_components/side_bar/SideBar";
import { redirect } from "next/navigation";
import MobileSidebar from "./_components/side_bar/MobileSidebar";
import UnauthorizedPage from "./_components/404/UnauthorizedPage";

const checkAuth = async () => {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  const token = tokenCookie ? `${tokenCookie.value}` : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/auth/session`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    redirect("/login");
  }
  const data = await res.json();

  return data;
};

const DashboardLayout = async ({ children }) => {
  const { data, status_code } = await checkAuth();

  if (!data || status_code !== 200) {
    return <UnauthorizedPage />;
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
