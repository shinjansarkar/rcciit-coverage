import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from '../../lib/supabase';
import SEO from '@/components/common/SEO';
import { createWebsiteStructuredData, createOrganizationStructuredData } from '@/lib/structuredData';
import BackgroundCarousel from '@/components/common/BackgroundCarousel';
import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const [timePeriods, setTimePeriods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [glowIndex, setGlowIndex] = useState<number | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mobile-only staggered letter glow sweep
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const LETTER_COUNT = 8; // C-O-V-E-R-A-G-E
    const LETTER_INTERVAL = 120; // ms between each letter lighting up
    const PAUSE_BETWEEN_RUNS = 3500; // ms between each full sweep

    let letterIndex = 0;
    let letterTimer: ReturnType<typeof setTimeout>;
    let sweepTimer: ReturnType<typeof setTimeout>;

    const runSweep = () => {
      letterIndex = 0;
      const stepLetter = () => {
        setGlowIndex(letterIndex);
        letterTimer = setTimeout(() => {
          if (letterIndex < LETTER_COUNT - 1) {
            letterIndex++;
            stepLetter();
          } else {
            // End of sweep — clear after brief hold
            setTimeout(() => setGlowIndex(null), 400);
          }
        }, LETTER_INTERVAL);
      };
      stepLetter();
    };

    // Initial delay before first run
    sweepTimer = setTimeout(function loop() {
      runSweep();
      sweepTimer = setTimeout(loop, PAUSE_BETWEEN_RUNS);
    }, 2000);

    return () => {
      clearTimeout(letterTimer);
      clearTimeout(sweepTimer);
    };
  }, []);

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("periods")
          .select(`
            id,
            name,
            start_date,
            end_date,
            is_active,
            events:events!period_id ( id )
          `)
          .order("start_date", { ascending: false });

        if (error) {
          console.error("Error fetching periods:", error);
          setTimePeriods([]);
        } else {
          const mapped = (data || []).map((p: any) => ({
            id: p.id,
            title: p.name,
            startDate: p.start_date,
            endDate: p.end_date,
            status: p.is_active ? "active" : "archived",
            eventCount: p.events ? p.events.length : 0,
          }));
          setTimePeriods(mapped);
        }
      } catch (err) {
        console.error("Error in fetchPeriods:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPeriods();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  const websiteStructuredData = createWebsiteStructuredData();
  const organizationData = createOrganizationStructuredData({
    name: "RCCIIT Coverage Team",
    url: "https://rcciit-coverage.vercel.app",
    logo: "https://rcciit-coverage.vercel.app/logo.png",
    description: "Official documentation and resource portal for RCCIIT events",
    email: "coverage.rcciit.official@gmail.com"
  });

  // Stagger animation for hero text
  const heroLetters = "COVERAGE".split("");

  return (
    <div className="min-h-screen bg-black relative text-white selection:bg-white selection:text-black font-sans">
      <SEO
        title="Event Documentation & Resource Portal"
        description="Access comprehensive documentation, photos, videos, and resources from RCCIIT events. Browse by academic year to find cultural festivals, seminars, workshops, and institutional activities."
        keywords="RCCIIT events, college documentation, event photos, cultural festival, academic events, RCCIIT coverage, institutional activities, student events"
        url="/"
        structuredData={[websiteStructuredData, organizationData]}
      />

      {/* Dynamic Background Image Glimpse */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCarousel />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95"></div>
      </div>

      {/* Hero Section */}
      <section ref={targetRef} className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-12 pt-20">
        <div className="max-w-[1400px] w-full mx-auto">
          <motion.div
            style={{ y: textY, opacity: opacityFade }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-white/50"></div>
            <span className="text-sm md:text-base tracking-[0.3em] uppercase text-white/80 font-medium">RCC Institute of Information Technology</span>
          </motion.div>

          <motion.div style={{ y: titleY, opacity: opacityFade }} className="overflow-hidden mb-2">
            <motion.h1
              className="text-[4.5rem] sm:text-[7rem] md:text-[10rem] lg:text-[15rem] font-bold tracking-tighter leading-[0.80] text-white select-none"
            >
              {heroLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 120, rotate: 10 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1 + index * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block hover:scale-110 active:scale-95 transition-transform"
                >
                  <span
                    className="inline-block text-stroke transition-all duration-150"
                    style={glowIndex === index ? {
                      color: 'rgba(255,255,255,0.95)',
                      WebkitTextStroke: '1px transparent',
                      opacity: 1,
                      textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4)'
                    } : {}}
                  >
                    {letter}
                  </span>
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "backOut" }}
                className="text-primary inline-block ml-2 text-glow"
              >
                .
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.div
            style={{ y: textY, opacity: opacityFade }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-8 mt-16 md:mt-24 items-end"
          >
            <p className="text-xl md:text-3xl font-light text-white/70 max-w-xl leading-relaxed">
              We capture the fleeting moments. The definitive visual archive documenting the culture, technical symposiums, and raw energy of our student body.
            </p>

            <div className="flex flex-col lg:items-end justify-end space-y-8">
              <div className="flex gap-12 text-left lg:text-right">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{timePeriods.reduce((acc, period) => acc + period.eventCount, 0)}</div>
                  <div className="text-xs tracking-[0.2em] text-white/40 uppercase">Archived Events</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{timePeriods.length}</div>
                  <div className="text-xs tracking-[0.2em] text-white/40 uppercase">Time Vaults</div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Archives / Time Periods List */}
      <section id="archives" className="relative z-10 py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mb-16 md:mb-24 flex items-end justify-between border-b border-white/10 pb-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Vaults</h2>
            <span className="text-sm tracking-[0.2em] text-white/40 uppercase hidden sm:block">Explore Chronologically</span>
          </div>

          {timePeriods.length === 0 ? (
            <div className="text-center py-32 border border-white/10 rounded-3xl glass-panel">
              <h3 className="text-2xl font-bold mb-4">No Vaults Available</h3>
              <p className="text-white/50">The archives are currently being updated.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {timePeriods.map((period, i) => (
                <motion.div
                  key={period.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link
                    to={`/events/${period.id}`}
                    className="group block py-10 md:py-16 border-b border-white/10 relative overflow-hidden"
                  >
                    {/* Hover reveal background */}
                    <div className="absolute inset-0 bg-white/[0.03] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-6 md:gap-12">
                        <span className="text-sm md:text-lg font-mono text-white/30 group-hover:text-white/60 transition-colors">
                          {(i + 1).toString().padStart(2, '0')}
                        </span>
                        <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white/60 group-hover:text-white group-hover:translate-x-4 transition-all duration-500 ease-[0.16,1,0.3,1]">
                          {period.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-8 md:gap-16 pl-14 md:pl-0">
                        <div className="flex flex-col gap-1 items-start md:items-end">
                          <span className="text-[10px] md:text-xs tracking-[0.2em] text-white/40 uppercase">Events Captured</span>
                          <span className="text-lg md:text-xl font-medium">{period.eventCount}</span>
                        </div>

                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;