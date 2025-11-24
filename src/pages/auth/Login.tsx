import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import SEO from '@/components/common/SEO';

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success("Login successful!");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <SEO
        title="Admin Login"
        description="Admin login portal for RCCIIT Coverage Team. Access administrative features to manage events, resources, and documentation."
        url="/login"
        noIndex={true}
      />
      
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="RCCIIT Coverage Logo" 
              className="w-12 h-12 object-contain"
            />
            <div className="text-left">
              <h1 className="text-2xl font-bold text-primary-foreground uppercase">RCCIIT Coverage Team</h1>
              <p className="text-sm text-primary-foreground/80">Admin Portal</p>
            </div>
          </Link>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-2xl backdrop-blur bg-card/95">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your admin account to manage events and resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@rcciit.org"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>



              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-card-hover transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need access?{" "}
                <a href="mailto:coverage.rcciit.official@gmail.com" className="text-primary hover:underline">
                  Contact administrator
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8">
          <p className="text-sm text-primary-foreground/60 text-center">
            © {new Date().getFullYear()} RCCIIT Coverage Team. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;