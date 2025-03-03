
import { useEffect } from "react";
import HospitalList from "@/components/HospitalList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HospitalsListPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <HospitalList />
      </main>
      <Footer />
    </div>
  );
}
