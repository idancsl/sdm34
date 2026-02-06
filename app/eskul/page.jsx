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

export default function EskulPage() {
  const { data, error } = useSWR("/api/eskul", fetcher);

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-xl mx-auto my-20">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Gagal memuat data ekstrakurikuler.</AlertDescription>
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
        Ekstrakurikuler
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((eskul) => (
          <Card
            key={eskul.id}
            className="
              group overflow-hidden rounded-2xl
              transition-all duration-300
              hover:scale-105 hover:shadow-2xl
            "
          >
            {/* IMAGE */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={eskul.image}
                alt={eskul.name}
                fill
                className="
                  object-cover
                  transition-transform duration-300
                  group-hover:scale-110
                "
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* CONTENT */}
            <CardContent className="p-4 text-center">
              <CardHeader className="p-0 space-y-1">
                <CardTitle className="text-lg font-semibold">
                  {eskul.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {eskul.schedule}
                </CardDescription>
              </CardHeader>

              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {eskul.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
