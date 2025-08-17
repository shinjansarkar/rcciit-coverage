import { Link } from "react-router-dom";
import { GraduationCap, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">RCCIIT Coverage</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your central hub for accessing event resources, photos, and documents from 
              Regional College of Computer and Information Technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
              <li>
                <a 
                  href="https://rcciit.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  RCCIIT Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Regional College of Computer and Information Technology</p>
              <p>Beliaghata, Kolkata - 700015</p>
              <p>West Bengal, India</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RCCIIT Coverage. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for the RCCIIT community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;