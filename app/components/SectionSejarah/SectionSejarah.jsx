"use client";
import { motion } from "framer-motion";

export default function SectionSejarah() {
  return (
    <section id="tentang" className="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6"
        >
          Sejarah Singkat
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-lg leading-relaxed"
        >
          SD Muhammadiyah 34 Cikupa berdiri dengan semangat mencetak generasi beriman, bertakwa, dan berakhlak mulia. Sekolah ini terus berkembang menjadi lembaga pendidikan unggulan yang menanamkan nilai Islami dan karakter mulia.
        </motion.p>
      </div>
    </section>
  );
}
