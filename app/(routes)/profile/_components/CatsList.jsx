"use client";

const CatsList = ({ initialCats }) => {
  return initialCats.length === 0 ? (
    <p>لم تقم باضافه أي قطة حتى الان.</p>
  ) : (
    <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
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

          {cat.status == "pending" && (
            <p className="break-keep  text-white dark:text-black font-extrabold bg-chart-3 mt-4  text-center rounded p-2">
              جارى مراجعه حاله الطلب من قبل الاداره
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CatsList;
