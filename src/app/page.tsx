import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import Checklist from "../components/Price";  // <-- Importa aquí
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#f5f7ff] text-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <Checklist />  {/* <-- Inserta el checklist aquí */}
      <Footer />
    </main>
  );
}
