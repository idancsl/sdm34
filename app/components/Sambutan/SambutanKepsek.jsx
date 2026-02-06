"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function SambutanKepsek() {
  return (
    <section id="sambutan" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/3">
          <Card className="p-4 shadow-lg rounded-2xl">
            <Image
              src="/img/Kepsek.jpg"
              alt="Kepala Sekolah"
              width={300}
              height={300}
              className="rounded-2xl"
            />
          </Card>
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-2">H. Miftah, S.Ag.</h2>
          <p className="text-lg leading-relaxed">
            Selamat datang di SD Muhammadiyah 34 Cikupa. Kami berkomitmen mencetak generasi Islami yang berprestasi dan berakhlak mulia.
          </p>
        </div>
      </div>
    </section>
  );
}
