import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Preloader from "@/components/common/Preloader";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PublicLayout = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Preloader />
      {/* Cinematic Noise Overlay */}
      <div className="bg-noise fixed inset-0 z-[100] pointer-events-none opacity-[0.04]"></div>

      {/* Magnetic Cursor Ambient Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-white/[0.07] blur-[120px] z-[90] mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
      />

      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;