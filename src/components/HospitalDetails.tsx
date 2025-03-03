
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Hospital, HospitalDetail } from "@/types/hospital";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Building2, 
  MapPin, 
  Star, 
  Users, 
  Grid3X3, 
  PenLine, 
  ArrowLeft,
  Heart,
  ImageIcon
} from "lucide-react";
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

export default function HospitalDetails() {
  const { id } = useParams<{ id: string }>();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [details, setDetails] = useState<HospitalDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const hospitalRes = await api.get(`/api/v1/hospitals/${id}`);
        setHospital(hospitalRes.data);
        
        try {
          const detailsRes = await api.get(`/api/v1/hospitals/details/${id}`);
          setDetails(detailsRes.data);
        } catch (error) {
          console.log("No details found for this hospital");
        }
      } catch (error) {
        console.error("Error fetching hospital data:", error);
        toast({
          title: "Error",
          description: "Failed to load hospital data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchHospitalData();
    }
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-4 animate-pulse">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-64" />
          </div>
          <Skeleton className="h-64 w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-32 w-full rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold">Hospital not found</h1>
        <p className="mt-2">The hospital you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/hospitals")} className="mt-4">
          Back to Hospitals
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 section-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">{hospital.name}</h1>
      </div>

      <div className="bg-gradient-to-r from-hospital-600 to-hospital-800 h-64 rounded-xl overflow-hidden mb-8 shadow-xl relative">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <div className="text-white">
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">{hospital.city}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-lg">{hospital.rating} Rating</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {hospital.specialty?.map((spec, index) => (
                <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/40">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="overview" className="text-base">Overview</TabsTrigger>
            <TabsTrigger value="details" className="text-base">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-hospital-600" />
                    Specialties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialty?.map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-hospital-100 text-hospital-800">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-hospital-600" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{hospital.city}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Full address information available upon request
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span
                            key={i}
                            className={`text-2xl ${
                              i < Math.floor(hospital.rating) ? "text-yellow-500" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                    </div>
                    <span className="text-lg font-medium">{hospital.rating}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card mt-8">
              <CardHeader>
                <CardTitle>About {hospital.name}</CardTitle>
                <CardDescription>
                  General information about this hospital
                </CardDescription>
              </CardHeader>
              <CardContent>
                {details?.description ? (
                  <p className="text-muted-foreground">{details.description}</p>
                ) : (
                  <p className="text-muted-foreground">
                    Detailed information about this hospital is not available yet. Please check back later or contact the hospital directly for more information.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            {details ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Users className="h-5 w-5 mr-2 text-hospital-600" />
                        Medical Staff
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-hospital-700">
                        {details.numberOfDoctors}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Skilled medical professionals
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Grid3X3 className="h-5 w-5 mr-2 text-hospital-600" />
                        Departments
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-hospital-700">
                        {details.numberOfDepartments}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Specialized units for comprehensive care
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {details.images && details.images.length > 0 && (
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ImageIcon className="h-5 w-5 mr-2 text-hospital-600" />
                        Hospital Images
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {details.images.map((image, index) => (
                          <div key={index} className="rounded-md overflow-hidden h-48">
                            <img
                              src={image}
                              alt={`${hospital.name} - ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>No Details Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Detailed information for this hospital has not been added yet.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate(`/hospitals/details/${id}`)}>
                    <PenLine className="h-4 w-4 mr-2" />
                    Add Details
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <Button 
          variant="outline" 
          onClick={() => navigate("/hospitals")}
        >
          Back to List
        </Button>
        <Button 
          onClick={() => navigate(`/hospitals/edit/${id}`)}
          className="button-hover"
        >
          <PenLine className="h-4 w-4 mr-2" />
          Edit Hospital
        </Button>
      </div>
    </div>
  );
}
