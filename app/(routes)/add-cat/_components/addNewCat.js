"use client";

export const handleSubmit = async ({ formData, images, vaccineImages }) => {
  if (!formData || !images) return;

  const form = new FormData();
  form.append("name", formData.name);
  form.append("city", formData.city);
  form.append("age", formData.age);
  form.append("ageUnit", formData.ageUnit);
  form.append("gender", formData.gender);
  form.append("vaccinated", formData.vaccinated);
  form.append("description", formData.description);

  images.forEach((img) => form.append("images", img));
  if (formData.vaccinated) {
    vaccineImages.forEach((img) => form.append("vaccinationImages", img));
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cats`, {
    method: "POST",
    body: form,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data?.message || "حدث خطأ أثناء إرسال الطلب");

  return data;
};
