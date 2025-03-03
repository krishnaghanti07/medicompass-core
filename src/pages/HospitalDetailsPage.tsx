
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import HospitalDetailForm from "@/components/HospitalDetailForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { HospitalDetail } from "@/types/hospital";

export default function HospitalDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<HospitalDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchHospitalDetails();
  }, [id]);

  const fetchHospitalDetails = async () => {
    try {
      const response = await api.get(`/api/v1/hospitals/details/${id}`);
      setDetails(response.data);
    } catch (error) {
      console.log("No details found for this hospital");
      setDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitDetails = async (data: any) => {
    try {
      if (details) {
        // Update existing details
        await api.put(`/api/v1/hospitals/details/update?id=${id}`, data);
      } else {
        // Add new details
        await api.post(`/api/v1/hospitals/details?id=${id}`, data);
      }
      return Promise.resolve();
    } catch (error) {
      console.error("Error saving hospital details:", error);
      toast({
        title: "Error",
        description: "Failed to save hospital details. Please try again.",
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
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hospital-600"></div>
            </div>
          ) : (
            <HospitalDetailForm
              hospitalId={id || ""}
              initialData={details || undefined}
              isEditing={!!details}
              onSubmit={handleSubmitDetails}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
