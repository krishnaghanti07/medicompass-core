
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

// Set the base URL for the backend API
const baseURL = process.env.NODE_ENV === "production" 
  ? "/api" 
  : "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || "An unexpected error occurred";
    
    // Don't show toast for 404 errors when checking if details exist
    if (error.response?.status === 404 && error.config?.url?.includes("/details/")) {
      return Promise.reject(error);
    }
    
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
    
    return Promise.reject(error);
  }
);

export default api;
