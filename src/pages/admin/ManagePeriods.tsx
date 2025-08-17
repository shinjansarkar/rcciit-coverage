import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar, FolderOpen } from "lucide-react";

const ManagePeriods = () => {
  const [periods, setPeriods] = useState([
    {
      id: "2024-1",
      title: "Academic Year 2024-25",
      description: "Current academic year events and resources",
      startDate: "2024-06-01",
      endDate: "2025-05-31",
      status: "active",
      eventCount: 12
    },
    {
      id: "2023-2", 
      title: "Academic Year 2023-24",
      description: "Previous academic year archives",
      startDate: "2023-06-01",
      endDate: "2024-05-31",
      status: "archived",
      eventCount: 18
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "archived":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${start} - ${end}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Time Periods</h1>
          <p className="text-muted-foreground">
            Create and manage time periods for organizing events
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Period
        </Button>
      </div>

      {/* Periods List */}
      <div className="space-y-4">
        {periods.map((period) => (
          <Card key={period.id} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl text-foreground">
                      {period.title}
                    </CardTitle>
                    <Badge className={getStatusColor(period.status)}>
                      {period.status === 'active' ? 'Active' : 'Archived'}
                    </Badge>
                  </div>
                  
                  <CardDescription className="text-sm leading-relaxed">
                    {period.description}
                  </CardDescription>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDateRange(period.startDate, period.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FolderOpen className="w-4 h-4" />
                      <span>{period.eventCount} events</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
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
      {periods.length === 0 && (
        <Card className="border-0 shadow-card">
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No time periods found
            </h3>
            <p className="text-muted-foreground mb-6">
              Create your first time period to start organizing events.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add First Period
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManagePeriods;