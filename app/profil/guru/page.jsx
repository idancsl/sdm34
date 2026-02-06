"use client";

import useSWR from "swr";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Guru() {
  const { data, error } = useSWR("/api/guru", fetcher);

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-xl mx-auto my-20">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Gagal memuat data guru.</AlertDescription>
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
        Profil Guru
      </h1>

      {/* GRID: 3 per baris */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((guru) => (
          <Card
            key={guru.id}
            className="
              group overflow-hidden rounded-2xl
              transition-all duration-300
              hover:scale-105 hover:shadow-2xl
            "
          >
            {/* FOTO */}
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image
                src={guru.photo}
                alt={guru.name}
                fill
                className="
                  object-cover
                  transition-transform duration-300
                  group-hover:scale-110
                "
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
              />
            </div>

            {/* INFO */}
            <CardContent className="p-4 text-center">
              <CardHeader className="p-0 space-y-1">
                <CardTitle className="text-lg font-semibold">
                  {guru.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {guru.subject}
                </CardDescription>
              </CardHeader>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
