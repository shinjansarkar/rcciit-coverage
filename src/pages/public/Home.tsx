import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, FolderOpen, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from '../../lib/supabase';
import SEO from '@/components/common/SEO';
import { createWebsiteStructuredData, createOrganizationStructuredData } from '@/lib/structuredData';
import BackgroundCarousel from '@/components/common/BackgroundCarousel';

const Home = () => {
  const [timePeriods, setTimePeriods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const fetchPeriods = async () => {
    try {
      setIsLoading(true);

      // Fetch periods + related events (for event count)
      const { data, error } = await supabase
        .from("periods")
        .select(`
          id,
          name,
          start_date,
          end_date,
          is_active,
          events:events!period_id (
            id,
            title,
            description,
            created_at
          )
        `)
        .order("start_date", { ascending: false });


      if (error) {
        console.error("Error fetching periods:", error);
        setTimePeriods([]);
      } else {
        // Map DB fields -> frontend expected fields
        const mapped = (data || []).map((p: any) => ({
          id: p.id,
          title: p.name, // map "name" -> "title"
          description: "", // no column in DB, keep empty for now
          startDate: p.start_date,
          endDate: p.end_date,
          status: p.is_active ? "active" : "archived",
          eventCount: p.events ? p.events.length : 0, // count related events
        }));

        setTimePeriods(mapped);
      }
    } catch (err) {
      console.error("Error in fetchPeriods:", err);
      setTimePeriods([]);
    } finally {
      setIsLoading(false);
    }
  };

  fetchPeriods();
}, []);


  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-success text-success-foreground"
      : "bg-muted text-muted-foreground";
  };


  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${start} - ${end}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section Skeleton */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-primary-foreground/20 rounded-lg w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-primary-foreground/20 rounded w-80 mx-auto mb-8"></div>
              <div className="h-10 bg-primary-foreground/20 rounded w-32 mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Content Skeleton */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  const websiteStructuredData = createWebsiteStructuredData();
  const organizationData = createOrganizationStructuredData({
    name: "RCCIIT Coverage Team",
    url: "https://rcciit-coverage.vercel.app",
    logo: "https://rcciit-coverage.vercel.app/logo.jpg",
    description: "Official documentation and resource portal for RCCIIT events",
    email: "coverage.rcciit.official@gmail.com"
  });

  return (
    <div className="min-h-screen relative">
      <BackgroundCarousel />
      
      <SEO
        title="Event Documentation & Resource Portal"
        description="Access comprehensive documentation, photos, videos, and resources from RCCIIT events. Browse by academic year to find cultural festivals, seminars, workshops, and institutional activities."
        keywords="RCCIIT events, college documentation, event photos, cultural festival, academic events, RCCIIT coverage, institutional activities, student events"
        url="/"
        structuredData={[websiteStructuredData, organizationData]}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[750px]">
        {/* Centered Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
              RCCIIT Coverage
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 drop-shadow-xl px-2">
              Access event photos, documents, and resources from our college events organized by time periods
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button size="lg" className="glossy-gold w-full sm:w-auto text-white border-0">
                <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Browse Resources
              </Button>
              <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base glass-effect px-4 py-2 rounded-lg">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Serving the RCCIIT community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center glass-effect-strong rounded-2xl p-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {timePeriods.reduce((acc, period) => acc + period.eventCount, 0)}
              </div>
              <div className="text-sm text-foreground/70">Total Events</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{timePeriods.length}</div>
              <div className="text-sm text-foreground/70">Time Periods</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-foreground/70">Access Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Periods Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 drop-shadow-lg">
              Browse by Time Period
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Select a time period to explore events, photos, and resources from that era
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timePeriods.length === 0 ? (
              <div className="col-span-full text-center py-12 glass-effect-strong rounded-2xl">
                <FolderOpen className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Time Periods Available</h3>
                <p className="text-foreground/70 mb-6">
                  There are currently no time periods to display. Check back later or contact the admin.
                </p>
                <Button asChild className="glossy-gold border-0">
                  <a href="mailto:coverage.rcciit.official@gmail.com">
                    Contact Admin
                  </a>
                </Button>
              </div>
            ) : (
              timePeriods.map((period) => (
              <Card 
                key={period.id} 
                className="group hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 border-0 glass-effect hover:glass-effect-strong"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-48 bg-gradient-primary opacity-60"></div>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                  <Badge 
                    className={`absolute top-4 right-4 glass-effect-strong ${getStatusColor(period.status)}`}
                  >
                    {period.status === 'active' ? 'Current' : 'Archived'}
                  </Badge>
                </div>
                
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {period.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-foreground/60">
                    {period.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDateRange(period.startDate, period.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FolderOpen className="w-4 h-4" />
                      <span>{period.eventCount} events</span>
                    </div>
                  </div>
                  
                  <Button 
                    asChild 
                    className="w-full group/button glossy-gold border-0 hover:shadow-card-hover transition-all duration-300"
                  >
                    <Link to={`/events/${period.id}`}>
                      <span>View Events</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 glass-effect-strong rounded-2xl p-8">
            <Clock className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-3xl font-bold text-foreground">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg text-foreground/70">
              Contact our admin team to request access to specific events or time periods
            </p>
            <Button size="lg" asChild className="glossy-gold border-0">
              <a href="mailto:coverage.rcciit.official@gmail.com">
                Contact Admin
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;