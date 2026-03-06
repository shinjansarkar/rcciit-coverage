import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-6 px-4 pointer-events-none"
    >
      <div className="w-full max-w-4xl bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full px-4 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.7)] pointer-events-auto transition-all duration-300">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 relative overflow-hidden rounded-full bg-white/5 border border-white/10">
              <img
                src="/logo.png"
                alt="RCCIIT Coverage Logo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h1 className="text-[0.95rem] font-bold text-white tracking-widest uppercase">
              Coverage <span className="text-primary-glow font-black">.</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-semibold tracking-wide transition-colors ${isActive("/") ? "text-primary-glow drop-shadow-[0_0_8px_rgba(200,160,50,0.8)]" : "text-white/60 hover:text-white"
                }`}
            >
              Home
            </Link>

            <Button variant="outline" size="sm" asChild className="rounded-full bg-white/5 border-white/10 text-white hover:bg-white/15 hover:text-white font-medium px-5">
              <Link to="/login">Admin Login</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="px-2 pt-4 pb-6 space-y-3 flex flex-col items-center">
                <Link
                  to="/"
                  className={`block px-4 py-2 text-sm font-semibold rounded-full w-full text-center transition-colors ${isActive("/")
                      ? "bg-primary/20 text-primary-glow border border-primary/30"
                      : "text-white/60 hover:text-white"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm font-semibold text-white/60 hover:text-white rounded-full w-full text-center transition-colors bg-white/5 border border-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;