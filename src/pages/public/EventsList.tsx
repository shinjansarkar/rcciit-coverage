import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, ExternalLink, FolderOpen, Image, Users } from "lucide-react";
import { supabase } from '../../lib/supabase';

// Mock data - replace with actual Supabase data
// const mockEvents = [
//   {
//     id: "event-1",
//     title: "Annual Cultural Fest 2024",
//     description: "Three-day cultural extravaganza featuring music, dance, and theatrical performances",
//     date: "2024-03-15",
//     linkCount: 8,
//     category: "Cultural",
//     coverImage: "/api/placeholder/300/200"
//   },
//   {
//     id: "event-2", 
//     title: "Tech Symposium 2024",
//     description: "Technical paper presentations and project showcases by students",
//     date: "2024-02-20",
//     linkCount: 5,
//     category: "Technical",
//     coverImage: "/api/placeholder/300/200"
//   },
//   {
//     id: "event-3",
//     title: "Fresher's Welcome 2024",
//     description: "Welcoming ceremony for new students with orientation and fun activities",
//     date: "2024-08-10",
//     linkCount: 12,
//     category: "Orientation",
//     coverImage: "/api/placeholder/300/200"
//   }
// ];

const EventsList = () => {
  const { periodId } = useParams();
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [periodInfo, setPeriodInfo] = useState<any | null>(null);

  useEffect(() => {
    const fetchEventsAndPeriod = async () => {
      setIsLoading(true);

      // Fetch events for this period
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

      // Fetch period info
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

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "cultural":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "technical":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "orientation":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-6"></div>
            <div className="h-12 bg-muted rounded w-96 mb-4"></div>
            <div className="h-6 bg-muted rounded w-64 mb-8"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-10 bg-muted rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Time Periods
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {periodInfo.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {periodInfo.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <FolderOpen className="w-4 h-4" />
              <span>{events.length} events</span>
            </div>
            <div className="flex items-center gap-1">
              <ExternalLink className="w-4 h-4" />
              <span>{events.reduce((acc, event) => acc + event.linkCount, 0)} total links</span>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="group hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-card"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="h-48 bg-gradient-primary opacity-80"></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <Badge 
                  className={`absolute top-4 right-4 ${getCategoryColor(event.category)}`}
                  variant="outline"
                >
                  {event.category}
                </Badge>
              </div>
              
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-3">
                  {event.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ExternalLink className="w-4 h-4" />
                    <span>{event.linkCount} links</span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  className="w-full group/button bg-gradient-primary hover:shadow-card-hover transition-all duration-300"
                >
                  <Link to={`/event/${event.id}`}>
                    <Image className="w-4 h-4 mr-2" />
                    <span>View Resources</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground mb-6">
              There are no events available for this time period yet.
            </p>
            <Button asChild>
              <Link to="/">
                Back to Time Periods
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;