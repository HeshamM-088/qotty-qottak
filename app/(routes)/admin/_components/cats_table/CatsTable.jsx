"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import CatsModal from "../cats_modal/CatsModal";
import Link from "next/link";
import { toast } from "react-hot-toast";

const CatsTable = ({ allCats }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cats, setCats] = useState(allCats);
  const [approved, setApproved] = useState(false);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCats((prev) => prev.filter((cat) => cat.status.includes(searchQuery)));
  }, [approved]);

  const updateCatStatus = async (id, status, reason = "") => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cats/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, rejectionReason: reason }),
      },
    );

    setLoading(false);

    const data = await res.json();

    return data;
  };

  const handleApproveCat = async (cat) => {
    try {
      const result = await updateCatStatus(cat._id, "approved");

      setCats((prev) => prev.map((c) => (c._id === cat._id ? result.data : c)));
      setApproved(!approved);
    } catch (err) {
      toast.error("حدث خطا اثناء العمليه , برجاء المحاوله مره اخرى");
    }
  };

  const handleRejectCat = (cat) => {
    setSelectedCat(cat);
    setRejectModalOpen(true);
  };

  const submitRejection = async () => {
    if (!rejectionReason.trim()) {
      return toast.error("من فضلك اكتب سبب الرفض");
    }

    try {
      const result = await updateCatStatus(
        selectedCat._id,
        "rejected",
        rejectionReason,
      );

      setCats((prev) =>
        prev.map((c) => (c._id === selectedCat._id ? result.data : c)),
      );

      setRejectModalOpen(false);
      setRejectionReason("");
    } catch {
      toast.error("حدث خطا اثناء العمليه , برجاء المحاوله مره اخرى");
    }
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center flex-1 gap-2 bg-muted rounded-lg px-4 py-2 min-w-50">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث عن حاله طلب الاضافه..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
            />
          </div>

          <Button
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Plus className="w-4 h-4" />
            إضافة قطة
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-right font-semibold">الاسم</th>
                <th className="px-6 py-3 text-right font-semibold">العمر</th>
                <th className="px-6 py-3 text-right font-semibold">
                  الحالة الصحية
                </th>
                <th className="px-6 py-3 text-right font-semibold">
                  حالة الطلب
                </th>
                <th className="px-6 py-3 text-right font-semibold">
                  عرض الطلب
                </th>
                <th className="px-6 py-3 text-right font-semibold">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody className="bg-neutral-100 dark:bg-black">
              {cats.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-b hover:bg-muted/50 transition"
                >
                  <td className="px-6 py-4">{cat.name}</td>

                  <td className="px-6 py-4">
                    {cat.age} {cat.ageUnit}
                  </td>

                  <td className="px-6 py-4">
                    {cat.vaccinated ? "مطعم" : "غير مطعم"}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-bold
                      ${cat.status === "pending" && "text-chart-5"}
                      ${cat.status === "available" && "text-chart-2"}
                      ${cat.status === "rejected" && "text-red-500"}`}
                    >
                      {cat.status === "pending" && "قيد المراجعة"}
                      {cat.status === "available" && "متاح"}
                      {cat.status === "rejected" && "تم الرفض"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/cats/${cat._id}`}
                      className="underline text-primary"
                    >
                      تفاصيل الطلب
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    {cat.status === "pending" ? (
                      <div className="flex gap-2 justify-center">
                        <Button
                          onClick={() => handleApproveCat(cat)}
                          disabled={loading}
                          className="bg-accent-foreground font-bold cursor-pointer"
                        >
                          {loading ? <Loader /> : "موافقة"}
                        </Button>

                        <Button
                          onClick={() => handleRejectCat(cat)}
                          variant="secondary"
                          disabled={loading}
                          className="font-bold cursor-pointer"
                        >
                          {loading ? <Loader /> : "رفض"}
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">---</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cats.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            لا توجد قطط تطابق البحث
          </div>
        )}
      </div>

      {/* Modal إضافة قطة */}
      <CatsModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* ❌ Modal سبب الرفض */}
      {rejectModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl w-full max-w-md p-6 border border-border shadow-lg">
            <h3 className="text-lg font-bold mb-3">سبب رفض الطلب</h3>

            <textarea
              rows={4}
              placeholder="اكتب سبب الرفض هنا..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full border border-border rounded-lg p-3 bg-background resize-none outline-none"
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setRejectModalOpen(false)}
              >
                إلغاء
              </Button>

              <Button
                onClick={submitRejection}
                disabled={rejectionReason == "" ? true : false}
                className="bg-destructive text-white font-bold"
              >
                تأكيد الرفض
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CatsTable;
