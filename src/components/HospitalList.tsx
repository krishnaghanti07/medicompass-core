
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hospital } from "@/types/hospital";
import HospitalCard from "@/components/HospitalCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, FilePlus, Building2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cityOptions } from "@/lib/constants";
import api from "@/lib/api";

export default function HospitalList() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchHospitals();
  }, []);

  useEffect(() => {
    filterHospitals();
  }, [hospitals, searchTerm, selectedCity]);

  const fetchHospitals = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/v1/hospitals");
      setHospitals(response.data);
      setFilteredHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      toast({
        title: "Error",
        description: "Failed to load hospitals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterHospitals = () => {
    let filtered = [...hospitals];
    
    if (searchTerm) {
      filtered = filtered.filter(hospital => 
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCity) {
      filtered = filtered.filter(hospital => 
        hospital.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }
    
    setFilteredHospitals(filtered);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/v1/hospitals/delete?id=${id}`);
      setHospitals(prevHospitals => prevHospitals.filter(hospital => hospital._id !== id));
      toast({
        title: "Hospital Deleted",
        description: "The hospital has been successfully removed.",
      });
    } catch (error) {
      console.error("Error deleting hospital:", error);
      toast({
        title: "Error",
        description: "Failed to delete hospital. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city === "all" ? "" : city);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Building2 className="h-8 w-8 mr-2 text-hospital-600" />
            Hospitals
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage hospitals in the database
          </p>
        </div>
        <Button 
          onClick={() => navigate("/hospitals/new")} 
          className="button-hover"
        >
          <FilePlus className="h-4 w-4 mr-2" />
          Add Hospital
        </Button>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input-focus"
          />
        </div>
        <div className="w-full md:w-64">
          <Select onValueChange={handleCityChange} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Filter by city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cityOptions.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-hospital-600 mb-4" />
          <p className="text-muted-foreground">Loading hospitals...</p>
        </div>
      ) : filteredHospitals.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No hospitals found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedCity
              ? "No hospitals match your search criteria."
              : "There are no hospitals in the database yet."}
          </p>
          <Button onClick={() => navigate("/hospitals/new")}>
            <FilePlus className="h-4 w-4 mr-2" />
            Add Hospital
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <div key={hospital._id} className="slide-up">
              <HospitalCard hospital={hospital} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
