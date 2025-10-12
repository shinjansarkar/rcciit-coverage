import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, FolderOpen, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from '../../lib/supabase';

// Mock data - replace with actual Supabase data
// const mockTimePeriods = [
//   {
//     id: "2024-1",
//     title: "Academic Year 2024-25",
//     description: "Current academic year events and resources",
//     eventCount: 12,
//     startDate: "2024-06-01",
//     endDate: "2025-05-31",
//     status: "active",
//     coverImage: "/api/placeholder/400/240"
//   },
//   {
//     id: "2023-2",
//     title: "Academic Year 2023-24", 
//     description: "Previous academic year archives",
//     eventCount: 18,
//     startDate: "2023-06-01",
//     endDate: "2024-05-31",
//     status: "archived",
//     coverImage: "/api/placeholder/400/240"
//   },
//   {
//     id: "2023-1",
//     title: "Academic Year 2022-23",
//     description: "Historical events and documentation",
//     eventCount: 15,
//     startDate: "2022-06-01", 
//     endDate: "2023-05-31",
//     status: "archived",
//     coverImage: "/api/placeholder/400/240"
//   }
// ];

const Home = () => {
  const [timePeriods, setTimePeriods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const fetchPeriods = async () => {
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
      const mapped = data.map((p: any) => ({
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

    setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            RCCIIT Coverage
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Access event photos, documents, and resources from our college events organized by time periods
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
              <FolderOpen className="w-5 h-5 mr-2" />
              Browse Resources
            </Button>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Users className="w-5 h-5" />
              <span className="text-sm">Serving the RCCIIT community</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {timePeriods.reduce((acc, period) => acc + period.eventCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{timePeriods.length}</div>
              <div className="text-sm text-muted-foreground">Time Periods</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Access Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Periods Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Browse by Time Period
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a time period to explore events, photos, and resources from that era
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timePeriods.map((period) => (
              <Card 
                key={period.id} 
                className="group hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-card"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-48 bg-gradient-primary opacity-80"></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <Badge 
                    className={`absolute top-4 right-4 ${getStatusColor(period.status)}`}
                  >
                    {period.status === 'active' ? 'Current' : 'Archived'}
                  </Badge>
                </div>
                
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {period.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {period.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
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
                    className="w-full group/button bg-gradient-primary hover:shadow-card-hover transition-all duration-300"
                  >
                    <Link to={`/events/${period.id}`}>
                      <span>View Events</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <Clock className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-3xl font-bold text-foreground">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg text-muted-foreground">
              Contact our admin team to request access to specific events or time periods
            </p>
            <Button size="lg" asChild>
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