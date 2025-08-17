import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, ExternalLink, Download, FolderOpen, Image, Eye } from "lucide-react";

// Mock data - replace with actual Supabase data
const mockEventDetail = {
  id: "event-1",
  title: "Annual Cultural Fest 2024",
  description: "Three-day cultural extravaganza featuring music, dance, and theatrical performances from March 15-17, 2024.",
  date: "2024-03-15",
  category: "Cultural",
  coverImage: "/api/placeholder/600/300",
  links: [
    {
      id: "link-1",
      title: "Day 1 - Opening Ceremony Photos",
      description: "High-resolution photos from the grand opening ceremony",
      url: "https://drive.google.com/drive/folders/1ABC123...",
      type: "photos",
      fileCount: 45,
      size: "127 MB"
    },
    {
      id: "link-2", 
      title: "Day 2 - Cultural Performances",
      description: "Photos and videos from dance and music competitions",
      url: "https://drive.google.com/drive/folders/1DEF456...",
      type: "mixed",
      fileCount: 89,
      size: "234 MB"
    },
    {
      id: "link-3",
      title: "Day 3 - Prize Distribution",
      description: "Award ceremony and closing event documentation",
      url: "https://drive.google.com/drive/folders/1GHI789...",
      type: "photos",
      fileCount: 32,
      size: "98 MB"
    },
    {
      id: "link-4",
      title: "Event Brochure & Schedule",
      description: "Official program schedule and promotional materials",
      url: "https://drive.google.com/drive/folders/1JKL012...",
      type: "documents",
      fileCount: 8,
      size: "15 MB"
    }
  ]
};

const EventDetail = () => {
  const { eventId } = useParams();
  const [eventDetail, setEventDetail] = useState(mockEventDetail);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [eventId]);

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "photos":
        return <Image className="w-5 h-5" />;
      case "documents":
        return <FolderOpen className="w-5 h-5" />;
      case "mixed":
        return <Download className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "photos":
        return "bg-green-100 text-green-800 border-green-200";
      case "documents":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "mixed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-6"></div>
            <div className="h-64 bg-muted rounded-lg mb-6"></div>
            <div className="h-12 bg-muted rounded w-96 mb-4"></div>
            <div className="h-6 bg-muted rounded w-64 mb-8"></div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full mb-4"></div>
                    <div className="h-10 bg-muted rounded w-32"></div>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to={`/events/2024-1`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </Button>

        {/* Event Header */}
        <div className="mb-8">
          {/* Cover Image */}
          <div className="relative overflow-hidden rounded-lg mb-6">
            <div className="h-64 bg-gradient-primary"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <Badge 
                className="bg-card text-card-foreground border-0 mb-2"
                variant="outline"
              >
                {eventDetail.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {eventDetail.title}
              </h1>
            </div>
          </div>

          {/* Event Info */}
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {eventDetail.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(eventDetail.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ExternalLink className="w-4 h-4" />
                <span>{eventDetail.links.length} resource links</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span>{eventDetail.links.reduce((acc, link) => acc + link.fileCount, 0)} total files</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Links */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Available Resources
          </h2>
          
          <div className="space-y-4">
            {eventDetail.links.map((link) => (
              <Card 
                key={link.id} 
                className="group hover:shadow-card-hover transition-all duration-300 border-0 shadow-card"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(link.type)}
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {link.title}
                          </CardTitle>
                        </div>
                        <Badge 
                          className={getTypeColor(link.type)}
                          variant="outline"
                        >
                          {link.type}
                        </Badge>
                      </div>
                      
                      <CardDescription className="text-sm leading-relaxed">
                        {link.description}
                      </CardDescription>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{link.fileCount} files</span>
                        <span>•</span>
                        <span>{link.size}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLinkClick(link.url)}
                        className="min-w-0"
                      >
                        <Eye className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Preview</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleLinkClick(link.url)}
                        className="bg-gradient-primary min-w-0"
                      >
                        <ExternalLink className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Open Drive</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Missing Resources?
          </h3>
          <p className="text-muted-foreground mb-4">
            If you notice any missing files or have additional resources to add, please contact our admin team.
          </p>
          <Button asChild>
            <Link to="/admin">
              Contact Admin
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;