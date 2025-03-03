
import { useEffect } from "react";
import HospitalDetails from "@/components/HospitalDetails";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HospitalDetailPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <HospitalDetails />
      </main>
      <Footer />
    </div>
  );
}
