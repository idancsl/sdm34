import Image from "next/image";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import SectionSejarah from "../components/SectionSejarah/SectionSejarah";
import SambutanKepsek from "../components/Sambutan/SambutanKepsek";
import Prestasi from "../components/Prestasi/Prestasi";
import Footer from "../components/Footer/Footer";
import Guruu from "../components/Guruu/Guruu";
// import Guru from "../components/Guru/Guruu";



export default function Home() {
  return (
    <div className="">
      <Navbar /> 
      <Hero />
      <SambutanKepsek />
      <SectionSejarah />
      <Guruu />
      <Prestasi />
      <Footer />
    </div>
  );
}
console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("SERVICE KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0,20));
