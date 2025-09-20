import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout
    const performLogout = async () => {
      try {
        await logout();
        // Clear localStorage and cookies
        localStorage.clear();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirect to public home page
        navigate("/");
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="border-0 shadow-2xl backdrop-blur bg-card/95 max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-primary-foreground/10 backdrop-blur rounded-lg flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Logging Out
          </h1>
          
          <p className="text-muted-foreground mb-6">
            You are being signed out of your account...
          </p>
          
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logout;