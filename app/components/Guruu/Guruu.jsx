"use client";

import useSWR from "swr";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Guruu() {
  const { data, error } = useSWR("/api/admin/guru", fetcher);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const guruList = Array.isArray(data) ? data : [];
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
    <>
      <section id="guru" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-600">
          Profil Guru
        </h2>

        {/* SLIDER */}
        <div
          className="
            flex gap-6 overflow-x-auto pb-4
            snap-x snap-mandatory
            scrollbar-hide
          "
        >
          {guruList.map((guru) => (
            <motion.div
              key={guru.id}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.95 }}
              className="snap-start"
            >
              <Card
                onClick={() => setSelectedGuru(guru)}
                className="
                  cursor-pointer
                  min-w-[220px] sm:min-w-[240px] md:min-w-[260px]
                  rounded-2xl overflow-hidden
                  hover:shadow-xl transition
                "
              >
                <div className="relative w-full h-[240px]">
                  <Image
                    src={guru.photo}
                    alt={guru.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <CardContent className="p-4 text-center">
                  <CardTitle className="text-base">
                    {guru.name}
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {guru.subject}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedGuru && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGuru(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 120) {
                  setSelectedGuru(null);
                }
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="
                bg-white rounded-3xl overflow-hidden
                w-[90%] max-w-md
              "
            >
              <div className="relative w-full h-[320px]">
                <Image
                  src={selectedGuru.photo}
                  alt={selectedGuru.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 text-center space-y-2">
                <h3 className="text-xl font-bold">
                  {selectedGuru.name}
                </h3>
                <p className="text-gray-500">
                  {selectedGuru.subject}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedGuru.jenisKelamin}
                </p>

                <p className="text-xs text-gray-400 pt-2">
                  Swipe ke bawah untuk menutup
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
