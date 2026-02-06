"use client";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold mb-2">Lokasi</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.1385979159675!2d106.5382541!3d-6.221538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fe03fdea0593%3A0x708b08e43ee94537!2sSD%20Muhammadiyah%2034!5e0!3m2!1sid!2sid!4v1700000000000"
            width="100%"
            height="150"
            loading="lazy"
            className="rounded-xl"
          ></iframe>
        </div>

        <div>
          <h3 className="font-bold mb-2">Kontak</h3>
          <p>Jl. Raya Serang No.20, RT.3/RW.3, Sukadamai, Kec. Cikupa, Kabupaten Tangerang, Banten 15710, Indonesia</p>
          <p>Email: info@sdm34.sch.id</p>
          <p>Telepon: (021) 1234567</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Sosial Media</h3>
          <div className="flex gap-4 mt-2">
            <Button asChild variant="ghost">
              <a href="instagram.com/sdm34cikupa"><Instagram /></a>
            </Button>
            <Button asChild variant="ghost">
              <a href="#"><Youtube /></a>
            </Button>
            <Button asChild variant="ghost">
              <a href="#"><Facebook /></a>
            </Button>
          </div>
        </div>
      </div>
      <p className="text-center mt-8 text-gray-400">© 2026 SD Muhammadiyah 34 Cikupa</p>
    </footer>
  );
}
