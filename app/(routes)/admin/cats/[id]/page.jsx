import { getCatById } from "@/backend/services/cat.service";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { StepBack } from "lucide-react";

const StatusBadge = ({ status }) => {
  const map = {
    pending: "bg-secondary text-secondary-foreground",
    available: "bg-primary text-primary-foreground",
    rejected: "bg-destructive text-destructive-foreground",
  };

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium ${
        map[status] || "bg-muted text-muted-foreground"
      }`}
    >
      {status === "pending" && "قيد المراجعه"}
      {status === "available" && "متاح"}
      {status === "rejected" && "تم الرفض"}
    </span>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-border py-3 last:border-none">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const getCat = async (id) => {
  const response = await getCatById(id);

  const data = await response.json();

  return data;
};

const CatRequestDetails = async ({ params }) => {
  const { id } = await params;

  const { data: cat } = await getCat(id);

  if (!cat) notFound();

  console.log(cat);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{cat.name}</h1>
          <p className="text-muted-foreground mt-1">
            تم إنشاء الطلب في{" "}
            {new Date(cat.createdAt).toLocaleDateString("ar-EG")}
          </p>
        </div>

        <StatusBadge status={cat.status} />

        <Link
          href="/admin/cats"
          className="underline underline-offset-4 text-primary font-bold text-base"
        >
          العوده
          <StepBack className="inline " />
        </Link>
      </div>

      {/* Images */}
      <section>
        <h2 className="text-xl font-semibold mb-4">صور القطة</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cat.images.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted"
            >
              <Image
                src={img}
                alt={`cat-${index}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">البيانات الأساسية</h2>

          <InfoRow label="العمر" value={`${cat.age} ${cat.ageUnit}`} />
          <InfoRow label="النوع" value={cat.gender} />
          <InfoRow label="المدينة" value={cat.city} />
          <InfoRow
            label="الحالة الصحية"
            value={cat.vaccinated ? "مطعم" : "غير مطعم"}
          />

          {cat.status == "rejected" && (
            <InfoRow label="سبب الرفض" value={cat.rejectionReason} />
          )}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">الوصف</h2>
          <p className="text-muted-foreground leading-relaxed">
            {cat.description || "لا يوجد وصف مضاف"}
          </p>
        </div>
      </section>

      {/* Vaccination Images */}
      {cat.vaccinationImages?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">صور التطعيمات</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cat.vaccinationImages.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted"
              >
                <Image
                  src={img}
                  alt={`vaccination-${index}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading={"lazy"}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CatRequestDetails;
