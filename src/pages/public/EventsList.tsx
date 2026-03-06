import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, ExternalLink, FolderOpen, Image, Info } from "lucide-react";
import { supabase } from '../../lib/supabase';
import BackgroundCarousel from '@/components/common/BackgroundCarousel';
import { motion } from "framer-motion";

const EventsList = () => {
  const { periodId } = useParams();
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [periodInfo, setPeriodInfo] = useState<any | null>(null);

  useEffect(() => {
    const fetchEventsAndPeriod = async () => {
      setIsLoading(true);

      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .eq("period_id", periodId)
        .order("created_at", { ascending: false });

      if (eventsError) {
        console.error("Error fetching events:", eventsError);
        setEvents([]);
      } else {
        setEvents(eventsData ?? []);
      }

      const { data: periodData, error: periodError } = await supabase
        .from("periods")
        .select("*")
        .eq("id", periodId)
        .single();

      if (periodError) {
        console.error("Error fetching period:", periodError);
        setPeriodInfo(null);
      } else {
        setPeriodInfo(periodData);
      }

      setIsLoading(false);
    };

    if (periodId) {
      fetchEventsAndPeriod();
    }
  }, [periodId]);

  const formatDate = (dateString: string) => {
    const newDate = new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${newDate}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative text-white selection:bg-white selection:text-black font-sans">
      {/* Dynamic Background Image Glimpse */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCarousel />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[12px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-32 relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-2 transition-transform" />
            Return to Vaults
          </Link>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6">
            {periodInfo?.name || periodInfo?.title || 'Unknown Period'}
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl leading-relaxed mb-8">
            {periodInfo?.description || "Visual documentation and resources from this time period."}
          </p>
          <div className="flex items-center gap-6 text-sm font-mono text-white/40 uppercase tracking-widest border-t border-white/10 pt-8 mt-8">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              <span>{events.length} Archives</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>{(periodInfo?.is_active) ? 'ONGOING' : 'ARCHIVED'}</span>
            </div>
          </div>
        </motion.div>

        {/* Events Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="h-full"
            >
              <Link
                to={`/event/${event.id}`}
                className="group block h-full flex flex-col p-8 rounded-[2rem] glass-panel glass-panel-hover relative overflow-hidden"
              >
                {/* Event Category Tag (Subtle) */}
                <div className="absolute top-8 right-8 text-[10px] tracking-[0.2em] font-mono uppercase text-white/40 group-hover:text-white/80 transition-colors">
                  {event.category || 'Event'}
                </div>

                <div className="flex-1 mt-6 md:mt-12 space-y-4 mb-16">
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white/80 group-hover:text-white transition-colors leading-[1.1]">
                    {event.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/50 font-light leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>

                <div className="mt-auto border-t border-white/10 pt-6 flex items-center justify-between text-white/40 group-hover:text-white/60 transition-colors">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.updated_at || event.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span>{event.linkCount || 0} Assets</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </Link>
            </motion.div>
          ))}
        </div>

        {events.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 border border-white/10 rounded-[2rem] glass-panel"
          >
            <FolderOpen className="w-16 h-16 text-white/20 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
              No events found
            </h3>
            <p className="text-white/50 mb-8 max-w-md mx-auto font-light">
              We haven't uploaded any resources for this period yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 h-12 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-medium"
            >
              Return to Vaults
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventsList;