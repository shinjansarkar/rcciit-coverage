import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import SEO from '@/components/common/SEO';
import { motion } from "framer-motion";
import BackgroundCarousel from '@/components/common/BackgroundCarousel';

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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative text-white selection:bg-white selection:text-black font-sans">
      <SEO
        title="Admin Login"
        description="Admin login portal for RCCIIT Coverage Team."
        url="/login"
        noIndex={true}
      />

      {/* Dynamic Background Image Glimpse */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCarousel />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[12px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95"></div>
      </div>

      {/* Top left return button, fixed globally */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-8 left-4 sm:left-8 z-50"
      >
        <Link to="/" className="inline-flex items-center text-xs font-mono tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-2 transition-transform" />
          Back to Public Site
        </Link>
      </motion.div>

      <div className="w-full max-w-md relative z-10 pt-16 h-full flex flex-col items-center justify-center">

        {/* Branding & Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center text-center space-y-6 mb-12"
        >
          <Link to="/" className="group block mb-4">
            <div className="w-20 h-20 relative overflow-hidden rounded-full bg-white/5 border border-white/10 p-4 shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-700">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase mt-4">Login</h1>
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-white/40">Admin Access</p>
          </div>
        </motion.div>

        {/* Minimal Glass Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full relative group"
        >
          {/* Subtle Ambient Behind Form */}
          <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-30 blur-2xl group-hover:opacity-60 transition duration-1000 -z-10 rounded-[3rem]"></div>

          <div className="relative glass-panel rounded-[2rem] border border-white/5 p-8 sm:p-12 overflow-hidden shadow-2xl">
            {/* Fine overlay line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-xs font-mono tracking-[0.1em] uppercase text-white/50 ml-1">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@rcciit.org"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/30 rounded-xl transition-all font-mono"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-xs font-mono tracking-[0.1em] uppercase text-white/50 ml-1">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/30 rounded-xl transition-all font-mono pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 hover:bg-white/10 rounded-lg"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-white/50" />
                    ) : (
                      <Eye className="h-4 w-4 text-white/50" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 mt-6 text-sm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Footer info absolute to bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/30">
            Need access?  <a href="mailto:coverage.rcciit.official@gmail.com" className="text-white hover:underline transition-all">Contact Administrator</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;