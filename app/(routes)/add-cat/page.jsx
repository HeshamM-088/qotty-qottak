"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import CitySelect from "./_components/CitySelect";

const MAX_CAT_IMAGES = 3;
const MAX_VACCINE_IMAGES = 2;

const AddCatPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    age: "",
    ageUnit: "",
    gender: "",
    description: "",
    vaccinated: null,
  });

  const [images, setImages] = useState([]);
  const [vaccineImages, setVaccineImages] = useState([]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length >= MAX_CAT_IMAGES) return;

    const remaining = MAX_CAT_IMAGES - images.length;
    setImages((prev) => [...prev, ...files.slice(0, remaining)]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVaccineUpload = (e) => {
    const files = Array.from(e.target.files);
    if (vaccineImages.length >= MAX_VACCINE_IMAGES) return;

    const remaining = MAX_VACCINE_IMAGES - vaccineImages.length;
    setVaccineImages((prev) => [...prev, ...files.slice(0, remaining)]);
  };

  const removeVaccineImage = (index) => {
    setVaccineImages((prev) => prev.filter((_, i) => i !== index));
  };

  const isFormValid =
    formData.name &&
    formData.city &&
    formData.age &&
    formData.ageUnit &&
    formData.gender &&
    formData.vaccinated !== null &&
    images.length > 0 &&
    (formData.vaccinated === false || vaccineImages.length > 0);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8 text-center md:text-right">
            <h1 className="mb-2 font-serif text-3xl font-bold">
              عرض قطة للتبني في مصر
            </h1>
            <p className="text-muted-foreground">
              ساعد قطتك في العثور على منزل آمن وعائلة محبة.
            </p>
          </div>

          <div className="grid gap-8">
            {/* ===== معلومات القطة ===== */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif">معلومات القطة</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>اسم القطة</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>المدينة</Label>
                    <CitySelect
                      value={formData.city}
                      onChange={(val) => handleChange("city", val)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>العمر</Label>
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") e.preventDefault();
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>وحدة العمر</Label>
                    <Select onValueChange={(v) => handleChange("ageUnit", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الوحدة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="أيام">أيام</SelectItem>
                        <SelectItem value="شهور">شهور</SelectItem>
                        <SelectItem value="سنين">سنين</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>النوع</Label>
                  <Select onValueChange={(v) => handleChange("gender", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ذكر">ذكر</SelectItem>
                      <SelectItem value="أنثى">أنثى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>حالة التطعيم</Label>
                  <Select
                    onValueChange={(v) =>
                      handleChange("vaccinated", v === "true")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="هل القطة متطعمة؟" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">متطعمة</SelectItem>
                      <SelectItem value="false">غير متطعمة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* ===== Vaccine Images ===== */}
                {formData.vaccinated === true && (
                  <div className="space-y-3">
                    <Label>صور التطعيمات (حد أقصى 2 صور)</Label>

                    <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed">
                      <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        disabled={vaccineImages.length >= MAX_VACCINE_IMAGES}
                        onChange={handleVaccineUpload}
                      />
                    </label>

                    <div className="grid grid-cols-3 gap-3">
                      {vaccineImages.map((img, i) => (
                        <div key={i} className="relative">
                          <img
                            src={URL.createObjectURL(img)}
                            className="h-24 w-full rounded-lg object-cover"
                          />
                          <button
                            onClick={() => removeVaccineImage(i)}
                            className="absolute right-1 top-1 bg-black/60 p-1 rounded-full text-white"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ===== Cat Images ===== */}
                <div className="space-y-3">
                  <Label>صور القطة (حد أقصى 3 صور)</Label>

                  <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed">
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      disabled={images.length >= MAX_CAT_IMAGES}
                      onChange={handleImagesUpload}
                    />
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    {images.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={URL.createObjectURL(img)}
                          className="h-24 w-full rounded-lg object-cover"
                        />
                        <button
                          onClick={() => removeImage(i)}
                          className="absolute right-1 top-1 bg-black/60 p-1 rounded-full text-white"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>وصف القطة</Label>
                  <Textarea
                    placeholder="وصف عام لقطتك"
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Button size="lg" className="w-full" disabled={!isFormValid}>
              {isFormValid ? "نشر إعلان التبني" : "أكمل البيانات أولًا"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddCatPage;
