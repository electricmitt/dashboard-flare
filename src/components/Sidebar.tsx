import { Database, Home, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Database, label: "Database", path: "/database" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 p-4">
      <div className="flex items-center gap-2 mb-8 px-4">
        <Database className="h-6 w-6 text-primary" />
        <span className="font-semibold text-lg">DB Manager</span>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;