import { Card } from "@/components/ui/card";
import { Database, Server, TableProperties } from "lucide-react";

const stats = [
  {
    label: "Total Tables",
    value: "24",
    icon: TableProperties,
    trend: "+2 this week",
  },
  {
    label: "Database Size",
    value: "1.2 GB",
    icon: Database,
    trend: "+50MB today",
  },
  {
    label: "Active Connections",
    value: "156",
    icon: Server,
    trend: "12% increase",
  },
];

const DatabaseStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              <p className="text-sm text-success mt-1">{stat.trend}</p>
            </div>
            <stat.icon className="h-5 w-5 text-muted-foreground" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DatabaseStats;