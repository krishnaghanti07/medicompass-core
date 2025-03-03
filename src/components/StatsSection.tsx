
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Star, HeartPulse } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      value: "250+",
      label: "Hospitals",
      icon: Building2,
      color: "bg-blue-100 text-blue-600",
    },
    {
      value: "15,000+",
      label: "Doctors",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      value: "4.8",
      label: "Average Rating",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      value: "30+",
      label: "Specialties",
      icon: HeartPulse,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card border-t-4 border-t-hospital-500 overflow-hidden relative">
              <div className="absolute -bottom-6 -right-6 opacity-10">
                <stat.icon className="h-32 w-32" />
              </div>
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
