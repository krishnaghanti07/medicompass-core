
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MapPin, Star, Search, Clock, Edit3 } from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      title: "Hospital Management",
      description: "Create, update, and delete hospital records with ease.",
      icon: Heart,
    },
    {
      title: "Location Filtering",
      description: "Find hospitals by city and location to streamline your search.",
      icon: MapPin,
    },
    {
      title: "Rating System",
      description: "View and update hospital ratings to help users make informed decisions.",
      icon: Star,
    },
    {
      title: "Advanced Search",
      description: "Powerful search functionality to quickly find the right hospital.",
      icon: Search,
    },
    {
      title: "Real-time Updates",
      description: "Changes to hospital records are reflected instantly across the platform.",
      icon: Clock,
    },
    {
      title: "Detailed Editing",
      description: "Comprehensive forms for managing all aspects of hospital data.",
      icon: Edit3,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our hospital management system offers a comprehensive set of features designed to streamline healthcare administration and improve operational efficiency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-hospital-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-hospital-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
