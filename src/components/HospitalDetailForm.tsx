
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HospitalDetail } from "@/types/hospital";
import { Loader2, Save, ArrowLeft, Plus, X } from "lucide-react";

interface HospitalDetailFormProps {
  hospitalId: string;
  initialData?: HospitalDetail;
  isEditing?: boolean;
  onSubmit: (data: Partial<HospitalDetail>) => Promise<void>;
}

export default function HospitalDetailForm({ 
  hospitalId, 
  initialData, 
  isEditing = false, 
  onSubmit 
}: HospitalDetailFormProps) {
  const [formData, setFormData] = useState<Partial<HospitalDetail>>(
    initialData || {
      description: "",
      images: [""],
      numberOfDoctors: 0,
      numberOfDepartments: 0,
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.images?.length ? initialData.images : [""]
  );
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
    setFormData((prev) => ({ ...prev, images: newImageUrls.filter(url => url.trim() !== "") }));
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageField = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
    setFormData((prev) => ({ ...prev, images: newImageUrls.filter(url => url.trim() !== "") }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const filteredImages = imageUrls.filter(url => url.trim() !== "");
      const dataToSubmit = {
        ...formData,
        images: filteredImages.length > 0 ? filteredImages : undefined
      };
      
      await onSubmit(dataToSubmit);
      toast({
        title: isEditing ? "Details Updated" : "Details Added",
        description: isEditing 
          ? "Hospital details have been successfully updated." 
          : "Hospital details have been successfully added.",
      });
      navigate(`/hospitals/${hospitalId}`);
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
            <CardTitle>{isEditing ? "Edit Hospital Details" : "Add Hospital Details"}</CardTitle>
          </div>
          <CardDescription>
            {isEditing
              ? "Update additional information for this hospital"
              : "Provide additional information about this hospital"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Comprehensive description of the hospital, its history, and services..."
              className="h-32 input-focus"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="numberOfDoctors">Number of Doctors</Label>
              <Input
                id="numberOfDoctors"
                name="numberOfDoctors"
                type="number"
                min="0"
                value={formData.numberOfDoctors}
                onChange={handleNumberChange}
                className="input-focus"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfDepartments">Number of Departments</Label>
              <Input
                id="numberOfDepartments"
                name="numberOfDepartments"
                type="number"
                min="0"
                value={formData.numberOfDepartments}
                onChange={handleNumberChange}
                className="input-focus"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Hospital Images</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImageField}
                className="button-hover"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Image
              </Button>
            </div>
            
            {imageUrls.map((url, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={url}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="input-focus"
                />
                {imageUrls.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeImageField(index)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {imageUrls.some(url => url.trim() !== "") && (
              <div className="space-y-2 mt-4">
                <Label>Image Previews</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {imageUrls
                    .filter(url => url.trim() !== "")
                    .map((url, index) => (
                      <div key={index} className="border rounded-md overflow-hidden h-32">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=2070&auto=format&fit=crop";
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
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
                {isEditing ? "Updating..." : "Saving..."}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Update Details" : "Save Details"}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
