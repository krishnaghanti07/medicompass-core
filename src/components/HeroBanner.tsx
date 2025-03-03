
import { Button } from "@/components/ui/button";
import { ChevronRight, Building2, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-hospital-800 via-hospital-700 to-hospital-600 text-white">
      {/* Abstract shapes in the background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-[10%] w-72 h-72 bg-hospital-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-[15%] w-96 h-96 bg-hospital-400/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Modern Hospital Management System
            </h1>
            <p className="text-xl text-hospital-100 mb-8 max-w-lg">
              A comprehensive platform to manage hospital data, streamline operations, and improve healthcare delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/hospitals")} 
                className="bg-white text-hospital-800 hover:bg-gray-100 button-hover"
              >
                <Building2 className="mr-2 h-5 w-5" />
                View Hospitals
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/hospitals/new")}
                className="border-white text-white hover:bg-white/10 button-hover"
              >
                <Stethoscope className="mr-2 h-5 w-5" />
                Add New Hospital
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="hidden md:block slide-up-delay-1">
            <div className="rounded-lg overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=2070&auto=format&fit=crop" 
                alt="Hospital Dashboard" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="white">
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </div>
  );
}
