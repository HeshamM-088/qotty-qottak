"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";

const CatsFilters = ({ cats }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ageOptions = useMemo(() => {
    const ages = Array.from(new Set(cats.map((c) => c.age))).sort(
      (a, b) => a - b
    );
    return ages.map((a) => {
      const cat = cats.find((c) => c.age === a);
      return { value: String(a), label: cat.ageText };
    });
  }, [cats]);

  const getInitialFilters = () => ({
    age: searchParams.get("age") || "",
    city: searchParams.get("city") || "",
    vaccinated: searchParams.get("vaccinated") || "",
  });

  const [searchOptions, setSearchOptions] = useState(getInitialFilters());

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchOptions.age) params.set("age", searchOptions.age);
    if (searchOptions.city) params.set("city", searchOptions.city);
    if (searchOptions.vaccinated)
      params.set("vaccinated", searchOptions.vaccinated);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [searchOptions, router]);

  const resetFilters = () => {
    setSearchOptions({ age: "", city: "", vaccinated: "" });
  };

  return (
    <div className="mb-8">
      <div className="grid gap-4 md:grid-cols-5">
        <Select
          value={searchOptions.minAge}
          onValueChange={(val) =>
            setSearchOptions((prev) => ({ ...prev, age: val }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={searchParams.get("age") || "العمر"} />
          </SelectTrigger>
          <SelectContent>
            {ageOptions.map((opt) => (
              <SelectItem key={opt.value} value={String(opt.value)}>
                {opt.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City */}
        <Select
          value={searchOptions.city}
          onValueChange={(val) =>
            setSearchOptions((prev) => ({ ...prev, city: val }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="المدينة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="القاهرة">القاهرة</SelectItem>
            <SelectItem value="الإسكندرية">الإسكندرية</SelectItem>
            <SelectItem value="الجيزة">الجيزة</SelectItem>
            <SelectItem value="المنصورة">المنصورة</SelectItem>
            <SelectItem value="طنطا">طنطا</SelectItem>
          </SelectContent>
        </Select>

        {/* Vaccinated */}
        <Select
          value={searchOptions.vaccinated}
          onValueChange={(val) =>
            setSearchOptions((prev) => ({ ...prev, vaccinated: val }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="حالة التطعيم" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">متطعم</SelectItem>
            <SelectItem value="false">غير متطعم</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset */}
        <Button
          onClick={resetFilters}
          variant="outline"
          className="gap-2 bg-transparent"
        >
          <RotateCcw className="h-4 w-4" /> مسح الفلاتر
        </Button>
      </div>
    </div>
  );
};

export default CatsFilters;
