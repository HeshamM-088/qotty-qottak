import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMyRequests } from "@/backend/services/adopt.service";
import { getMyCats } from "@/backend/services/cat.service";
import { getServerSession } from "next-auth";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  const cats = await getMyCats(session.user.id);
  const requests = await getMyRequests(session.user.id);

  console.log({ cats, requests });

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">قططي</h2>
        {/* <CatsList cats={cats} /> */}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">طلبات التبني الخاصة بي</h2>
        {/* <RequestsList requests={requests} /> */}
      </section>
    </div>
  );
};

export default ProfilePage;
