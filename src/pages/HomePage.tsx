
import HeroBanner from "@/components/HeroBanner";
import FeatureSection from "@/components/FeatureSection";
import StatsSection from "@/components/StatsSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <HeroBanner />
      
      <FeatureSection />
      
      <StatsSection />
      
      <section className="py-16 bg-gradient-to-r from-hospital-600 to-hospital-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-hospital-100 mb-8 max-w-2xl mx-auto">
            Explore our platform and see how our hospital management system can help streamline your operations.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/hospitals")}
            className="bg-white text-hospital-800 hover:bg-gray-100 button-hover"
          >
            View All Hospitals
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
