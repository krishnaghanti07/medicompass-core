
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Hospital } from "@/types/hospital";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { specialtyOptions, cityOptions } from "@/lib/constants";

interface HospitalFormProps {
  initialData?: Hospital;
  isEditing?: boolean;
  onSubmit: (data: Partial<Hospital>) => Promise<void>;
}

export default function HospitalForm({ initialData, isEditing = false, onSubmit }: HospitalFormProps) {
  const [formData, setFormData] = useState<Partial<Hospital>>(
    initialData || {
      name: "",
      city: "",
      image: "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=2070&auto=format&fit=crop",
      specialty: [],
      rating: 3.5,
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(initialData?.specialty || []);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, rating: value[0] }));
  };

  const handleCityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, city: value }));
  };

  const handleSpecialtyChange = (value: string) => {
    const isSelected = selectedSpecialties.includes(value);
    
    if (isSelected) {
      setSelectedSpecialties(selectedSpecialties.filter(spec => spec !== value));
    } else {
      setSelectedSpecialties([...selectedSpecialties, value]);
    }
  };

  useEffect(() => {
    setFormData(prev => ({ ...prev, specialty: selectedSpecialties }));
  }, [selectedSpecialties]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      toast({
        title: isEditing ? "Hospital Updated" : "Hospital Created",
        description: isEditing 
          ? `${formData.name} has been successfully updated.` 
          : `${formData.name} has been successfully added.`,
      });
      navigate("/hospitals");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="section-fade-in">
      <Card className="glass-card w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle>{isEditing ? "Edit Hospital" : "Add New Hospital"}</CardTitle>
          </div>
          <CardDescription>
            {isEditing
              ? "Update the information for this hospital"
              : "Fill in the details to add a new hospital to the database"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Hospital Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Apollo Global Hospital"
                className="input-focus"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select onValueChange={handleCityChange} defaultValue={formData.city || ""}>
                <SelectTrigger id="city" className="input-focus">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cities</SelectLabel>
                    {cityOptions.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="input-focus"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-5)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="rating"
                  defaultValue={[formData.rating || 3.5]}
                  max={5}
                  min={1}
                  step={0.1}
                  onValueChange={handleRatingChange}
                  className="flex-1"
                />
                <span className="text-lg font-medium w-12 text-center">
                  {formData.rating?.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Specialties</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {specialtyOptions.map((specialty) => (
                <Button
                  key={specialty}
                  type="button"
                  variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSpecialtyChange(specialty)}
                  className="button-hover"
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </div>

          {formData.image && (
            <div className="space-y-2">
              <Label>Image Preview</Label>
              <div className="border rounded-md overflow-hidden h-48">
                <img
                  src={formData.image}
                  alt="Hospital Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=2070&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="button-hover"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Update Hospital" : "Create Hospital"}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
