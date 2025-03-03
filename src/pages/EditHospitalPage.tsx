
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import HospitalForm from "@/components/HospitalForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { Hospital } from "@/types/hospital";

export default function EditHospitalPage() {
  const { id } = useParams<{ id: string }>();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchHospital();
  }, [id]);

  const fetchHospital = async () => {
    try {
      const response = await api.get(`/api/v1/hospitals/${id}`);
      setHospital(response.data);
    } catch (error) {
      console.error("Error fetching hospital:", error);
      toast({
        title: "Error",
        description: "Failed to load hospital data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateHospital = async (data: any) => {
    try {
      await api.put(`/api/v1/hospitals/update?id=${id}`, data);
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating hospital:", error);
      toast({
        title: "Error",
        description: "Failed to update hospital. Please try again.",
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
          ) : hospital ? (
            <HospitalForm
              initialData={hospital}
              isEditing={true}
              onSubmit={handleUpdateHospital}
            />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Hospital Not Found</h2>
              <p className="text-muted-foreground">
                The hospital you're trying to edit doesn't exist or has been removed.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
