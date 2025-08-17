import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar, ExternalLink, Image } from "lucide-react";

const ManageEvents = () => {
  const [events, setEvents] = useState([
    {
      id: "event-1",
      title: "Annual Cultural Fest 2024",
      description: "Three-day cultural extravaganza featuring music, dance, and theatrical performances",
      date: "2024-03-15",
      category: "Cultural",
      linkCount: 8,
      periodTitle: "Academic Year 2024-25"
    },
    {
      id: "event-2",
      title: "Tech Symposium 2024", 
      description: "Technical paper presentations and project showcases by students",
      date: "2024-02-20",
      category: "Technical",
      linkCount: 5,
      periodTitle: "Academic Year 2024-25"
    },
    {
      id: "event-3",
      title: "Fresher's Welcome 2024",
      description: "Welcoming ceremony for new students with orientation and fun activities",
      date: "2024-08-10",
      category: "Orientation", 
      linkCount: 12,
      periodTitle: "Academic Year 2024-25"
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Events</h1>
          <p className="text-muted-foreground">
            Create and manage events within time periods
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Event
        </Button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <CardTitle className="text-xl text-foreground">
                      {event.title}
                    </CardTitle>
                    <Badge 
                      className={getCategoryColor(event.category)}
                      variant="outline"
                    >
                      {event.category}
                    </Badge>
                  </div>
                  
                  <CardDescription className="text-sm leading-relaxed">
                    {event.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ExternalLink className="w-4 h-4" />
                      <span>{event.linkCount} links</span>
                    </div>
                    <div className="text-xs px-2 py-1 bg-muted rounded-md">
                      {event.periodTitle}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Image className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <Card className="border-0 shadow-card">
          <CardContent className="p-12 text-center">
            <Image className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground mb-6">
              Create your first event to start adding resources.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add First Event
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManageEvents;