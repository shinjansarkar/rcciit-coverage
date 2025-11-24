import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, FolderOpen, ExternalLink, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      current: location.pathname === "/admin"
    },
    {
      name: "Time Periods",
      href: "/admin/periods", 
      icon: Calendar,
      current: location.pathname === "/admin/periods"
    },
    {
      name: "Events",
      href: "/admin/events",
      icon: FolderOpen,
      current: location.pathname === "/admin/events"
    },
    {
      name: "Resource Links",
      href: "/admin/links",
      icon: ExternalLink,
      current: location.pathname === "/admin/links"
    }
  ];

  return (
    <div className="w-64 bg-card border-r border-border">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="RCCIIT Coverage Logo" 
              className="w-8 h-8 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-foreground">RCCIIT Coverage</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    item.current
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-border">
          <Link
            to="/"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;