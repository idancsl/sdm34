"use client";

import { useRef } from "react";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AchievementsSection() {
  const { data, error } = useSWR("/api/prestasi", fetcher);
  const scrollRef = useRef(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  if (error)
    return (
      <Alert variant="destructive" className="mx-4 md:mx-auto max-w-2xl my-4">
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>Gagal memuat prestasi.</AlertDescription>
      </Alert>
    );

  if (!data)
    return (
      <div className="flex justify-center my-8">
        <Spinner className="w-10 h-10 text-green-500" />
      </div>
    );

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Prestasi Sekolah
      </h2>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-4 md:px-0"
        >
          {data.map((item) => (
            <Card
              key={item.id}
              className="min-w-[280px] max-w-[280px] flex-shrink-0 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Image */}
              <img
                src={item.media}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <CardContent className="p-3 flex-1 flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {item.name}
                  </p>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                    {item.level} • {item.year}
                  </CardDescription>
                </CardHeader>
                <p className="text-gray-700 dark:text-gray-300 mt-1 line-clamp-3 text-sm">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Arrow Buttons */}
        <Button
          size="icon"
          variant="outline"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          onClick={scrollPrev}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          onClick={scrollNext}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}
