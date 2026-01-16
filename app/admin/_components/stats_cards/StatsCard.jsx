import { PawPrint, Heart, Users } from "lucide-react";

const stats = [
  {
    id: 0,
    label: "عدد القطط",
    value: "248",
    icon: PawPrint,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    id: 1,
    label: "طلبات التبني",
    value: "52",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950",
  },
  {
    id: 2,
    label: "المستخدمون",
    value: "1,235",
    icon: Users,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950",
  },
];

const StatsCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-foreground mt-2">
                {stat.value}
              </p>
            </div>
            <div
              className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
