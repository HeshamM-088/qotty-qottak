import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMyRequests } from "@/backend/services/adopt.service";
import { getMyCats } from "@/backend/services/cat.service";
import { getServerSession } from "next-auth";
import CatsList from "./_components/CatsList";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  const cats = await getMyCats(session.user.id);
  const requests = await getMyRequests(session.user.id);

  const safeCats = cats?.map((cat) => ({
    ...cat,
    _id: cat._id.toString(),
    owner: cat.owner.toString(),
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">قططي</h2>
        <CatsList initialCats={safeCats} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">طلبات التبني الخاصة بي</h2>
        {/* <RequestsList requests={requests} /> */}
      </section>
    </div>
  );
};

export default ProfilePage;
