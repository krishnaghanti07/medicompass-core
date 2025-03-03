
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Home, 
  Heart, 
  Menu, 
  X, 
  FilePlus, 
  Github 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-hospital-600" />
          <span className="font-bold text-xl">MediCompass</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={isActive("/") ? "default" : "ghost"} 
              className="button-hover"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/hospitals">
            <Button 
              variant={isActive("/hospitals") ? "default" : "ghost"}
              className="button-hover"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Hospitals
            </Button>
          </Link>
          <Link to="/hospitals/new">
            <Button 
              variant="outline" 
              className="ml-2 button-hover"
            >
              <FilePlus className="h-4 w-4 mr-2" />
              Add Hospital
            </Button>
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="ml-2 button-hover"
            >
              <Github className="h-5 w-5" />
            </Button>
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/hospitals">
              <Button 
                variant={isActive("/hospitals") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Hospitals
              </Button>
            </Link>
            <Link to="/hospitals/new">
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <FilePlus className="h-4 w-4 mr-2" />
                Add Hospital
              </Button>
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="ghost" 
                className="w-full justify-start"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
