import DatabaseStats from "@/components/DatabaseStats";
import DataTable from "@/components/DataTable";
import MetricsChart from "@/components/MetricsChart";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="pl-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Database Overview</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage your database performance
            </p>
          </div>

          <DatabaseStats />

          <div className="grid grid-cols-1 gap-8">
            <MetricsChart />
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Table Structure</h2>
              <DataTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;