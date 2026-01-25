"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ConfirmModal from "./confirmDeleteCat";

const CatsList = ({ initialCats }) => {
  const [open, setOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (cat) => {
    setSelectedCat(cat);
    setOpen(true);
  };

  async function confirmDeleteCat(id) {
    try {
      setLoading(true);
      //   const res = await fetch(`/api/cats/${selectedCat._id}`, {
      //     method: "DELETE",
      //   });

      if (!res.ok) throw new Error("");

      toast.success("تم حذف القطة بنجاح", { duration: 4000 });
      setOpen(false);
    } catch {
      toast.error("تعذر الحذف برجاء المحاوله لاحقا", {
        duration: 4000,
      });
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return initialCats.length === 0 ? (
    <p>لم تقم باضافه أي قطة حتى الان.</p>
  ) : (
    <div className="grid grid-cols-1 bg-background md:grid-cols-3 gap-6">
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
          <div className="flex mt-2 space-x-2">
            {/* <Button
              disabled={cat.status == "rejected"}
              className="px-3 py-1 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600"
            >
              <Link href={`/cats/edit/${cat._id}`}>تعديل</Link>
            </Button> */}
            <Button
              onClick={() => handleDeleteClick(cat)}
              disabled={cat.status == "pending"}
              className="px-3 py-1 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600"
            >
              حذف
            </Button>
          </div>

          <ConfirmModal
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={confirmDeleteCat}
            loading={loading}
            title="حذف القطة"
            description={`هل أنت متأكد من حذف "${selectedCat?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
            confirmText="حذف"
          />
          {cat.status == "pending" && (
            <p className="break-keep  text-red-500 font-semibold text-start">
              لا يمكن التعديل على الطلب
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CatsList;
