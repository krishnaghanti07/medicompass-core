
import { useEffect } from "react";
import HomePage from "./HomePage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}
