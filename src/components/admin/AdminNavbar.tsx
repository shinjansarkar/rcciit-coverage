import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Settings, LogOut, User } from "lucide-react";

const AdminNavbar = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
          <p className="text-sm text-muted-foreground">RCCIIT Coverage Management</p>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>

          <div className="flex items-center space-x-2 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Admin User</span>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link to="/logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;