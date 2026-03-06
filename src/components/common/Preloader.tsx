import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait long enough for the smooth SVG draw to complete + exit animation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2800);

        return () => clearTimeout(timer);
    }, []);

    const svgVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.4
            }
        }
    };

    const pathVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut"
            }
        }
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100vh" }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden pointer-events-auto"
                >
                    <div className="relative flex flex-col items-center justify-center w-full h-full">

                        {/* Animated Camera Icon */}
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            variants={svgVariants}
                            initial="hidden"
                            animate="visible"
                            className="relative z-10 mb-8 opacity-80"
                        >
                            <motion.path
                                variants={pathVariants}
                                d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
                            />
                            <motion.circle
                                variants={pathVariants}
                                cx="12"
                                cy="13"
                                r="3"
                            />
                        </motion.svg>

                        {/* The main text */}
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                            className="text-white text-xl md:text-2xl font-bold tracking-[0.4em] uppercase select-none relative z-10"
                        >
                            RCCIIT Coverage
                        </motion.div>

                        {/* Horizontal Subtext */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 1.6 }}
                            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-[0.3em] uppercase font-mono z-10"
                        >
                            Focusing Lenses
                        </motion.div>

                        {/* Subtle scanning light effect */}
                        <motion.div
                            initial={{ left: "-10%", opacity: 0 }}
                            animate={{ left: "110%", opacity: 0.5 }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                            className="absolute top-0 bottom-0 w-[200px] bg-gradient-to-r from-transparent via-white/5 to-transparent blur-2xl z-0"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
