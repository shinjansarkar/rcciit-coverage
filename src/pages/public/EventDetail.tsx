import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, ExternalLink, Download, FolderOpen, Image } from "lucide-react";
import { supabase } from '../../lib/supabase';
import SEO from '@/components/common/SEO';
import { createEventStructuredData, createBreadcrumbStructuredData } from '@/lib/structuredData';
import BackgroundCarousel from '@/components/common/BackgroundCarousel';
import { motion } from "framer-motion";

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("events")
        .select("*, resource_links(*)")
        .eq("id", eventId)
        .single();

      if (error) {
        console.error("Error fetching event detail:", error);
        setEventDetail(null);
      } else if (data) {
        const links = data.resource_links ?? [];
        const totalFiles = links.reduce((acc: number, link: any) => acc + (link.fileCount ?? 0), 0);
        setEventDetail({ ...data, links, event_count: totalFiles });
      }

      setIsLoading(false);
    };

    if (eventId) fetchEventDetail();
  }, [eventId]);

  const getTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "photos":
        return <Image className="w-5 h-5 text-white/50" />;
      case "documents":
        return <FolderOpen className="w-5 h-5 text-white/50" />;
      case "mixed":
        return <Download className="w-5 h-5 text-white/50" />;
      default:
        return <ExternalLink className="w-5 h-5 text-white/50" />;
    }
  };

  const formatDate = (dateString: string) => {
    const newDate = new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${newDate}`;
  };

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  const eventStructuredData = eventDetail ? createEventStructuredData({
    id: eventDetail.id,
    title: eventDetail.title,
    description: eventDetail.description,
    date: eventDetail.event_date || eventDetail.created_at,
    coverImage: eventDetail.cover_image
  }) : null;

  const breadcrumbData = createBreadcrumbStructuredData([
    { name: "Home", url: "https://rcciit-coverage.vercel.app/" },
    { name: "Events", url: "https://rcciit-coverage.vercel.app/events" },
    { name: eventDetail?.title || "Event", url: `https://rcciit-coverage.vercel.app/event/${eventId}` }
  ]);

  return (
    <div className="min-h-screen bg-black relative text-white selection:bg-white selection:text-black font-sans">
      {/* Dynamic Background Image Glimpse */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCarousel />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[12px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95"></div>
      </div>

      {eventDetail && (
        <SEO
          title={eventDetail.title}
          description={eventDetail.description || `Comprehensive documentation and resources for ${eventDetail.title}.`}
          keywords={`${eventDetail.title}, RCCIIT event, event documentation, photos, videos`}
          url={`/event/${eventId}`}
          type="event"
          image={eventDetail.cover_image}
          publishedTime={eventDetail.event_date || eventDetail.created_at}
          structuredData={[eventStructuredData, breadcrumbData]}
        />
      )}

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 py-32 relative z-10">

        {/* Back Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors mb-16 group"
        >
          <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-2 transition-transform" />
          Back to Events
        </motion.button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="mb-6 flex items-center gap-4 text-xs font-mono text-white/40 uppercase tracking-widest">
            {eventDetail.category && <span>{eventDetail.category}</span>}
            {eventDetail.category && <span>•</span>}
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(eventDetail.updated_at || eventDetail.created_at)}
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-black tracking-tighter text-white mb-8 leading-[1.05]">
            {eventDetail.title}
          </h1>

          <p className="text-xl md:text-3xl text-white/60 font-light max-w-3xl leading-relaxed">
            {eventDetail.description}
          </p>
        </motion.div>

        {/* Resources Collection Layout */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-end justify-between border-b border-white/10 pb-6 mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Archived Assets
            </h2>
            <span className="text-sm font-mono tracking-widest text-white/40 uppercase hidden sm:block">
              {eventDetail.links.length} Collections
            </span>
          </motion.div>

          {eventDetail.links.length === 0 ? (
            <div className="py-20 text-center border top-0 border-white/5 rounded-3xl glass-panel">
              <FolderOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50 font-light text-lg">No assets have been archived for this event yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {eventDetail.links.map((link: any, index: number) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  key={link.id}
                  onClick={() => handleLinkClick(link.url)}
                  className="group relative cursor-pointer glass-panel p-6 sm:p-8 rounded-[1.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
                >
                  {/* Subtle Hover Gradient */}
                  <div className="absolute inset-0 bg-white/[0.02] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />

                  <div className="relative z-10 flex items-start sm:items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors duration-500">
                      {getTypeIcon(link.type)}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white/80 group-hover:text-white transition-colors mb-2">
                        {link.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/40 font-light">
                        {link.description || "Collection of assets"}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between md:justify-end gap-12 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-white/5 md:border-t-0">
                    <div className="flex items-center gap-8 text-sm font-mono uppercase tracking-widest text-white/30 hidden sm:flex">
                      <span>{link.type || 'ASSETS'}</span>
                    </div>

                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shrink-0">
                      <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-black transition-colors duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Missing Elements Contact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 sm:mt-32 p-10 sm:p-16 border border-white/5 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden glass-panel"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Missing Archives?
          </h3>
          <p className="text-lg text-white/50 font-light max-w-xl mb-10 leading-relaxed">
            Help us complete the historical record. If you have photographs or documentation for this event that isn't listed, please reach out.
          </p>
          <a
            href="mailto:coverage.rcciit.official@gmail.com"
            className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all duration-500"
          >
            Contact Coverage Team
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;