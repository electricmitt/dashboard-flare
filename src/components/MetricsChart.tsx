import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "00:00", queries: 400 },
  { name: "04:00", queries: 300 },
  { name: "08:00", queries: 600 },
  { name: "12:00", queries: 800 },
  { name: "16:00", queries: 900 },
  { name: "20:00", queries: 750 },
  { name: "23:59", queries: 500 },
];

const MetricsChart = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Query Performance</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="queries"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MetricsChart;