import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Sidebar from "./_components/side_bar/SideBar";
import { redirect } from "next/navigation";
import MobileSidebar from "./_components/side_bar/MobileSidebar";

const DashboardLayout = async ({ children }) => {
  const token = (await cookies()).get("token")?.value;

  let user = null;
  if (!token) redirect("/login");

  try {
    user = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
    console.log(process.env.NEXT_PUBLIC_SECRET_KEY);

    if (user.role !== "admin") {
      redirect("/login");
    }
  } catch (err) {
    redirect("/login");
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
