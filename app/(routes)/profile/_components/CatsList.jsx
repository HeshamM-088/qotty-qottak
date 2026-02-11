"use client";
import { MdPending } from "react-icons/md";
import { BiHappyHeartEyes } from "react-icons/bi";
import { RiEmotionUnhappyLine } from "react-icons/ri";

const CatsList = ({ initialCats }) => {
  console.log(initialCats);

  const AVALIABLE = "available";
  const PENDING = "pending";
  const REJECTED = "rejected";

  return initialCats.length === 0 ? (
    <p>لم تقم باضافه أي قطة حتى الان.</p>
  ) : (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initialCats.map((cat) => (
        <div key={cat._id} className="border p-4 rounded shadow-md">
          <img
            src={cat.images[0]}
            alt={cat.name}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="mt-2 font-bold">{cat.name}</h3>
          <p>العمر: {cat.age}</p>
          <p>الجنس: {cat.gender}</p>
          <p>المدينة: {cat.city}</p>

          {cat.status == PENDING ? (
            <p className="break-keep  text-yellow-500 font-extrabold mt-4  text-center rounded p-2">
              <MdPending className="inline me-2 text-2xl" />
              جارى مراجعه حاله الطلب من قبل الاداره
            </p>
          ) : cat.status == AVALIABLE ? (
            <p className="break-keep  text-emerald-600  font-extrabold  mt-4  text-center rounded p-2">
              <BiHappyHeartEyes className="inline me-2 text-2xl" />
              تم الموافقه على القطه يمكنك رؤيتها فى الموقع الان
            </p>
          ) : (
            <p className="break-keep  text-red-600 font-extrabold mt-4 text-center rounded p-2">
              <RiEmotionUnhappyLine className="inline me-2 text-2xl" />
              تم رفض الطلب بناء على :
              <span className="block">{cat.rejectionReason}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CatsList;
