import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Sidebar from "./_components/SideBar";
import { redirect } from "next/navigation";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

const DashboardLayout = async ({ children }) => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  let user = null;
  if (!token) redirect("/login");

  try {
    user = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-background">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
