"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle2, MapPin } from "lucide-react";

const CatsGrid = ({ cats }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ITEMS_PER_PAGE = 4;
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const searchOptions = {
    age: searchParams.get("age") || "",
    city: searchParams.get("city") || "",
    vaccinated: searchParams.get("vaccinated") || "",
  };

  const filteredCats = useMemo(() => {
    return cats.filter((cat) => {
      const matchAge = searchOptions.age ? cat.age == searchOptions.age : true;
      const matchCity = searchOptions.city
        ? cat.city === searchOptions.city
        : true;
      const matchVaccinated =
        searchOptions.vaccinated === ""
          ? true
          : searchOptions.vaccinated === "true"
          ? cat.vaccinated
          : !cat.vaccinated;
      return matchAge && matchCity && matchVaccinated;
    });
  }, [cats, searchOptions]);

  const totalPages = Math.ceil(filteredCats.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCats = filteredCats.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchOptions.age) params.set("age", searchOptions.age);
    if (searchOptions.city) params.set("city", searchOptions.city);
    if (searchOptions.vaccinated)
      params.set("vaccinated", searchOptions.vaccinated);
    params.set("page", currentPage);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [currentPage, searchOptions, router]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {currentCats.length === 0 && (
            <h1 className="text-lg font-bold dark:text-accent-foreground col-span-2">
              لا يوجد قطط حاليا متاحه لبحثك
            </h1>
          )}

          {currentCats.map((cat) => (
            <Card key={cat.id} className="overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-64 w-full object-cover"
                />
                {cat.vaccinated && (
                  <Badge className="absolute bottom-3 right-3">
                    <CheckCircle2 className="ml-1 h-3 w-3" /> متطعم
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold">{cat.name}</h3>
                  <Badge variant="secondary">{cat.gender}</Badge>
                </div>
                <div className="text-sm text-muted-foreground flex gap-4 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {cat.city}
                  </span>
                  <span>{cat.age}</span>
                </div>
                <Link href={`/cats/${cat.id}`}>
                  <Button
                    variant="outline"
                    className="w-full dark:text-accent-foreground bg-transparent cursor-pointer"
                  >
                    عرض التفاصيل
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            السابق
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            );
          })}
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            التالي
          </Button>
        </div>
      )}
    </>
  );
};

export default CatsGrid;
