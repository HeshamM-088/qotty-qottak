"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const catsData = [
  { name: "فارسي", value: 45 },
  { name: "شيرازي", value: 38 },
  { name: "سيامي", value: 25 },
  { name: "بريطاني", value: 32 },
  { name: "أخرى", value: 108 },
];

const requestsData = [
  { name: "مقبول", value: 35 },
  { name: "قيد المراجعة", value: 12 },
  { name: "مرفوض", value: 5 },
];

const adoptionData = [
  { month: "يناير", adoptions: 12 },
  { month: "فبراير", adoptions: 19 },
  { month: "مارس", adoptions: 15 },
  { month: "أبريل", adoptions: 25 },
  { month: "مايو", adoptions: 22 },
  { month: "يونيو", adoptions: 28 },
];

const COLORS = ["#16C47F", "#FCCD2A", "#F93827"];

const ChartsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          توزيع القطط حسب النوع
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={catsData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              opacity={0.1}
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="url(#colorValue)"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#279EFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#279EFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          حالة طلبات التبني
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={requestsData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8b5cf6"
              dataKey="value"
            >
              {requestsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          اتجاه التبني الشهري
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={adoptionData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              opacity={0.1}
            />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="adoptions"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: "#ec4899", r: 4 }}
              activeDot={{ r: 6 }}
              name="عدد التبني"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
