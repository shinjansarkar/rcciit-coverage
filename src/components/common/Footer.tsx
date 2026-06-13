import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-black relative overflow-hidden pt-20 pb-10">
      {/* Top Border Indicator */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-white/20"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-between h-full relative z-10">

        {/* Info Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12 mt-12">

          <div className="space-y-6">
            <h2 className="text-white/90 text-lg md:text-xl font-light tracking-tight max-w-sm leading-relaxed">
              The definitive visual archive for RCC Institute of Information Technology.
            </h2>
            <div className="flex flex-wrap gap-6 pt-4">
              <a href="https://www.instagram.com/rcciit_coverage/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-mono font-medium">Instagram</a>
              <a href="https://rcciit.edu.in/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-mono font-medium">Official Site</a>
              <Link to="/login" className="text-white/70 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-mono font-medium">Admin</Link>
            </div>
          </div>

          <div className="text-left md:text-right flex flex-col items-start md:items-end">
            <div className="w-14 h-14 relative overflow-hidden rounded-full bg-white/10 border border-white/20 mb-6 hover:scale-105 transition-all duration-500 shadow-xl flex items-center justify-center p-2">
              <img
                src="/logo.png"
                alt="RCCIIT Coverage Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-white/70 text-xs tracking-[0.1em] font-mono leading-relaxed uppercase">
              Canal South Road, Beliaghata<br />
              Kolkata - 700015
            </p>
          </div>

        </div>
      </div>

      {/* Massive Typography - Escaped from max-w bounds for true viewport scaling */}
      <div className="w-full relative z-10 flex flex-col items-center justify-center mb-12 select-none overflow-hidden group">
        <h1 className="text-[14.5vw] leading-[0.8] font-bold tracking-tighter text-transparent opacity-25 group-hover:opacity-100 group-hover:text-shadow-lg transition-all duration-1000 whitespace-nowrap px-4" style={{ WebkitTextStroke: "2px #ffffff" }}>
          COVERAGE.
        </h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs tracking-[0.3em] font-mono text-white/50 uppercase w-full gap-5 pt-8 border-t border-white/10">
          <span>&copy; {new Date().getFullYear()} COVERAGE TEAM</span>
          <div className="text-center sm:text-right group relative z-50 cursor-pointer">
            <span className="text-white/50 group-hover:text-white/80 transition-all duration-700 ease-out">
              Dangerously over-engineered by{" "}
              <span className="font-bold tracking-[0.2em] bg-gradient-to-r from-neutral-500 via-white to-neutral-500 bg-clip-text text-transparent border-b border-white/30 border-dashed pb-[1px] group-hover:border-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-500">
                SHINJAN, SAMBIT & SUPRATIM
              </span>
            </span>
            <span className="absolute -top-12 left-1/2 sm:left-auto sm:right-0 -translate-x-1/2 sm:translate-x-0 bg-black/40 backdrop-blur-xl border border-white/10 text-white/90 text-[10px] tracking-[0.2em] px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 pointer-events-none whitespace-nowrap shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              (YOU'RE WELCOME FOR THE AESTHETIC ✨)
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-white/5 blur-[100px] pointer-events-none"></div>
    </footer>
  );
};

export default Footer;