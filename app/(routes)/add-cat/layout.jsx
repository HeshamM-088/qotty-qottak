import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import UnauthorizedPage from "../admin/_components/404/UnauthorizedPage";

export const metadata = {
  title: "عرض قطة للتبني | قطتي - قطتك",
  description:
    "اعرض قطتك للتبني في مصر بسهولة وأمان. ساعد قطتك في العثور على منزل محب من خلال منصة قطتي - قطتك لتبني القطط.",
  keywords: [
    "عرض قطة للتبني",
    "تبني القطط",
    "تبني قطط في مصر",
    "قطط للتبني",
    "رعاية القطط",
  ],
  openGraph: {
    title: "عرض قطة للتبني | قطتي - قطتك",
    description:
      "اعرض قطتك للتبني وساعدها في العثور على عائلة محبة داخل مصر بسهولة وأمان.",
    locale: "ar_EG",
    type: "website",
  },
};

const AddCatLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <UnauthorizedPage
        pageName="صفحه اضافه القطط"
        loginMessage="تسجيل الدخول"
      />
    );
  }

  return children;
};

export default AddCatLayout;
