"use client";

import useSWR from "swr";
import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function GaleriPage() {
  const { data, error } = useSWR("/api/galeri", fetcher);

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-xl mx-auto my-10">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Gagal memuat galeri.</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="w-10 h-10 text-green-500" />
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-600">
        Galeri Kegiatan Sekolah
      </h1>

      {/* GRID GALERI */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {data.map((item) => (
          <Card
            key={item.id}
            className="
              group overflow-hidden rounded-2xl
              cursor-pointer
              transition-all duration-300
              hover:shadow-2xl
            "
          >
            <CardContent className="p-0">
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="
                    object-cover
                    transition-transform duration-300
                    group-hover:scale-110
                  "
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0 bg-black/40
                    flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  "
                >
                  <p className="text-white text-sm font-medium text-center px-2">
                    {item.title}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
