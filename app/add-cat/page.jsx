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
import { Upload, Info, CheckCircle2, X } from "lucide-react";

const AddCatPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    age: "",
    gender: "",
    description: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) return;

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const isFormValid =
    formData.name &&
    formData.city &&
    formData.age &&
    formData.gender &&
    formData.description &&
    images.length > 0;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8 text-center md:text-right">
            <h1 className="mb-2 font-serif text-3xl font-bold">
              عرض قطة للتبني في مصر
            </h1>
            <p className="text-muted-foreground">
              ساعد قطتك في العثور على منزل آمن وعائلة محبة من خلال منصة تبني
              القطط في مصر.
            </p>
          </div>

          <div className="grid gap-8">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif">معلومات القطة</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>اسم القطة</Label>
                    <Input
                      placeholder="مثال: لونا"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>المدينة</Label>
                    <Select
                      onValueChange={(value) => handleChange("city", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدينة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="القاهرة">القاهرة</SelectItem>
                        <SelectItem value="الإسكندرية">الإسكندرية</SelectItem>
                        <SelectItem value="الجيزة">الجيزة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>العمر</Label>
                    <Input
                      placeholder="مثال: 6 أشهر"
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>النوع</Label>
                    <Select
                      onValueChange={(value) => handleChange("gender", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">ذكر</SelectItem>
                        <SelectItem value="female">أنثى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>تحميل صور القطة (حد أقصى 5)</Label>

                  <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition hover:border-primary hover:bg-primary/5">
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      اضغط لاختيار الصور
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImagesUpload}
                    />
                  </label>

                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className="relative overflow-hidden rounded-lg"
                        >
                          <img
                            src={URL.createObjectURL(img)}
                            alt="cat"
                            className="h-24 w-full object-cover"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>وصف القطة وحالتها الصحية</Label>
                  <Textarea
                    rows={5}
                    placeholder="احكِ لنا عن شخصية القطة وحالتها الصحية"
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif">قواعد المنصة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 rounded-lg bg-primary/5 p-4 text-sm text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  يمنع بيع القطط أو طلب مقابل مادي للتبني.
                </div>

                <div className="flex gap-3 rounded-lg bg-muted p-4 text-sm text-chart-3">
                  <Info className="h-5 w-5" />
                  اختر متبنيًا موثوقًا لضمان حياة أفضل لقطتك. , اطلع على وثيقه
                  التبنى لضمان تطابق بيانات الشخص
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full cursor-pointer"
              disabled={!isFormValid}
            >
              {isFormValid ? "نشر إعلان التبني" : "أكمل البيانات أولًا"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddCatPage;
