
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import HospitalForm from "@/components/HospitalForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";

export default function CreateHospitalPage() {
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateHospital = async (data: any) => {
    try {
      await api.post("/api/v1/hospitals/create", data);
      return Promise.resolve();
    } catch (error) {
      console.error("Error creating hospital:", error);
      toast({
        title: "Error",
        description: "Failed to create hospital. Please try again.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-24">
        <div className="container mx-auto px-4">
          <HospitalForm onSubmit={handleCreateHospital} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
