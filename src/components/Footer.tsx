
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-8 border-t bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-hospital-600" />
              <span className="font-bold text-xl">MediCompass</span>
            </div>
            <p className="text-gray-500 text-sm">
              A modern hospital management system powered by React and Express.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-hospital-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hospitals" className="text-gray-500 hover:text-hospital-600 transition-colors">
                  Hospitals
                </Link>
              </li>
              <li>
                <Link to="/hospitals/new" className="text-gray-500 hover:text-hospital-600 transition-colors">
                  Add Hospital
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">API</h3>
            <ul className="space-y-2">
              <li>
                <a href="/api/v1/hospitals" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-hospital-600 transition-colors">
                  All Hospitals
                </a>
              </li>
              <li>
                <a href="/api/docs" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-hospital-600 transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Technologies</h3>
            <ul className="space-y-2">
              <li className="text-gray-500">React</li>
              <li className="text-gray-500">Express</li>
              <li className="text-gray-500">MongoDB</li>
              <li className="text-gray-500">Node.js</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} MediCompass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
