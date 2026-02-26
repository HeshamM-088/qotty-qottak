"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const CatsList = ({ initialCats }) => {
  const pending = initialCats.filter((c) => c.status === "pending");
  const approved = initialCats.filter((c) => c.status === "available");
  const rejected = initialCats.filter((c) => c.status === "rejected");

  return (
    <div className="space-y-10 animate-fade">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">قططي المضافة</h1>
        <p className="text-muted-foreground text-sm">
          تابع حالة القطط التي قمت بإضافتها بكل سهولة
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard
          title="قيد المراجعة"
          count={pending.length}
          variant="secondary"
        />
        <StatusCard
          title="تمت الموافقة"
          count={approved.length}
          variant="outline"
        />
        <StatusCard
          title="مرفوضة"
          count={rejected.length}
          variant="destructive"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="bg-muted rounded-xl p-1">
          <TabsTrigger value="pending">قيد المراجعة</TabsTrigger>
          <TabsTrigger value="approved">تمت الموافقة</TabsTrigger>
          <TabsTrigger value="rejected">مرفوضة</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <CatsGrid cats={pending} />
        </TabsContent>

        <TabsContent value="approved">
          <CatsGrid cats={approved} />
        </TabsContent>

        <TabsContent value="rejected">
          <CatsGrid cats={rejected} showReason />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CatsList;

function StatusCard({ title, count, variant }) {
  return (
    <Card className="rounded-xl shadow-sm border bg-card">
      <CardContent className="p-6 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{count}</p>
        </div>

        <Badge variant={variant} className="text-xs px-3 py-1 rounded-full">
          {title}
        </Badge>
      </CardContent>
    </Card>
  );
}

function CatsGrid({ cats, showReason = false }) {
  if (!cats.length)
    return (
      <p className="text-muted-foreground mt-6">لا توجد قطط في هذا القسم.</p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
      {cats.map((cat) => (
        <Card
          key={cat._id}
          className="group rounded-xl overflow-hidden border bg-card hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <img
              src={cat.images[0]}
              alt={cat.name}
              className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <StatusBadge status={cat.status} />
          </div>

          <CardContent className="p-5 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{cat.name}</h3>
              <p className="text-sm text-muted-foreground">
                {cat.age} {cat.ageUnit} • {cat.gender} • {cat.city}
              </p>
            </div>

            {showReason && cat.rejectionReason && (
              <div className="text-sm bg-destructive/5 font-bold text-destructive p-3 rounded-lg">
                سبب الرفض: {cat.rejectionReason}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const config = {
    pending: {
      label: "قيد المراجعة",
      className: "bg-secondary text-secondary-foreground",
    },
    available: {
      label: "تمت الموافقة",
      className: "bg-primary text-primary-foreground",
    },
    rejected: {
      label: "مرفوضة",
      className: "bg-destructive text-destructive-foreground",
    },
  };

  return (
    <span
      className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full shadow-sm ${config[status].className}`}
    >
      {config[status].label}
    </span>
  );
}
