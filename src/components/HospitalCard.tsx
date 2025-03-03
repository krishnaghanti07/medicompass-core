
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/types/hospital";
import { Trash2, PenLine, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HospitalCardProps {
  hospital: Hospital;
  onDelete: (id: string) => void;
}

export default function HospitalCard({ hospital, onDelete }: HospitalCardProps) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(hospital._id);
    } catch (error) {
      console.error("Failed to delete hospital:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="glass-card card-hover overflow-hidden">
      <div className="h-48 w-full overflow-hidden">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-semibold">{hospital.name}</CardTitle>
        <CardDescription className="text-sm">{hospital.city}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2 mb-3">
          {hospital.specialty && hospital.specialty.map((spec, index) => (
            <Badge key={index} variant="outline" className="bg-hospital-100 text-hospital-800 border-hospital-200">
              {spec}
            </Badge>
          ))}
        </div>
        <div className="flex items-center">
          <span className="text-sm">Rating:</span>
          <div className="flex ml-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span key={i} className={`text-lg ${i < Math.floor(hospital.rating) ? "text-yellow-500" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
          </div>
          <span className="ml-1 text-sm text-gray-600">{hospital.rating}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate(`/hospitals/${hospital._id}`)} className="button-hover">
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate(`/hospitals/edit/${hospital._id}`)} className="button-hover">
          <PenLine className="h-4 w-4 mr-1" /> Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="button-hover">
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete {hospital.name} from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
