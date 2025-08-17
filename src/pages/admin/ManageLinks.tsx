import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink, FolderOpen, Image, Download } from "lucide-react";

const ManageLinks = () => {
  const [links, setLinks] = useState([
    {
      id: "link-1",
      title: "Day 1 - Opening Ceremony Photos",
      description: "High-resolution photos from the grand opening ceremony",
      url: "https://drive.google.com/drive/folders/1ABC123...",
      type: "photos",
      fileCount: 45,
      size: "127 MB",
      eventTitle: "Annual Cultural Fest 2024"
    },
    {
      id: "link-2",
      title: "Day 2 - Cultural Performances", 
      description: "Photos and videos from dance and music competitions",
      url: "https://drive.google.com/drive/folders/1DEF456...",
      type: "mixed",
      fileCount: 89,
      size: "234 MB",
      eventTitle: "Annual Cultural Fest 2024"
    },
    {
      id: "link-3",
      title: "Technical Paper Presentations",
      description: "PDF documents and presentation slides from the symposium",
      url: "https://drive.google.com/drive/folders/1GHI789...",
      type: "documents",
      fileCount: 15,
      size: "45 MB",
      eventTitle: "Tech Symposium 2024"
    }
  ]);

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

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Resource Links</h1>
          <p className="text-muted-foreground">
            Add and manage Google Drive links for event resources
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Link
        </Button>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {links.map((link) => (
          <Card key={link.id} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(link.type)}
                      <CardTitle className="text-xl text-foreground">
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
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>{link.fileCount} files</span>
                    <span>•</span>
                    <span>{link.size}</span>
                    <div className="text-xs px-2 py-1 bg-muted rounded-md">
                      {link.eventTitle}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground font-mono bg-muted/30 p-2 rounded">
                    {link.url}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleLinkClick(link.url)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open
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
      {links.length === 0 && (
        <Card className="border-0 shadow-card">
          <CardContent className="p-12 text-center">
            <ExternalLink className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No resource links found
            </h3>
            <p className="text-muted-foreground mb-6">
              Add your first Google Drive link to start sharing resources.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add First Link
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManageLinks;