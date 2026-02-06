import { NextResponse } from "next/server";

export async function GET() {
  const prestasi = [
    {
      id: 1,
      name: "Abdullah Zaini Sahata Pane",
      title: "Juara 2 Lomba MHQ Pentas PAI Tingkat SD Se-Kecamatan Cikupa",
      media: "/img/abduul.webp",
      type: "image",
      level: "Kecamatan",
      year: 2025,
      description: "Siswa SD Muhammadiyah 34 berhasil meraih juara 2 lomba MHQ Pentas PAI tingkat kecamatan."
    },
    {
      id: 2,
      name: "Rania Ufaira Afifa",
      title: "Juara 1 Pesilat Putri Terbaik Tingkat SD",
      media: "/img/raniaa.webp",
      type: "image",
      level: "Kabupaten",
      year: 2025,
      description: "Rania Ufaira Afifa berhasil meraih juara 1 pesilat putri terbaik tingkat SD di Kejuaraan cabang PIMDA Open Tournament 15-16 November di Gedung Dakwah Muhammadiyah Tangsel."
    },
    {
      id: 3,
      name: "Machiko Al Ghifari Zidan Laksono",
      title: "Juara 1 Kejuaraan Cabang PIMDA Open Tournament Tingkat SD Kelas 6",
      media: "/img/machikoo.webp",
      type: "image",
      level: "Kabupaten",
      year: 2025,
      description: "Machiko Al Ghifari Zidan Laksono berhasil meraih juara 1 tingkat SD di Kejuaraan cabang PIMDA Open Tournament 15-16 November di Gedung Dakwah Muhammadiyah Tangsel."
    },
    {
      id: 4,
      name: "Ghofar",
      title: "Juara 1 Kejuaraan Cabang PIMDA Open Tournament Tingkat SD Kelas 5",
      media: "/img/ghofar.webp",
      type: "image",
      level: "Kabupaten",
      year: 2025,
      description: "Ghofar berhasil meraih juara 1 pesilat putra terbaik tingkat SD di Kejuaraan cabang PIMDA Open Tournament 15-16 November di Gedung Dakwah Muhammadiyah Tangsel."
    },
    {
      id: 5,
      name: "Kichiro Al Tezza Ammar Laksono",
      title: "Juara 2 Kejuaraan Cabang PIMDA Open Tournament Tingkat SD",
      media: "/img/kichiro.webp",
      type: "image",
      level: "Kabupaten",
      year: 2025,
      description: "Kichiro Al Tezza Ammar Laksono berhasil meraih juara 2 tingkat SD di Kejuaraan cabang PIMDA Open Tournament 15-16 November di Gedung Dakwah Muhammadiyah Tangsel."
    },
    // {
    //   id: 6,
    //   name: "Kichiro Al Tezza Ammar Laksono",
    //   title: "Juara 2 Kejuaraan Cabang PIMDA Open Tournament Tingkat SD",
    //   media: "/img/kichiro.webp",
    //   type: "image",
    //   level: "Kabupaten",
    //   year: 2025,
    //   description: "Kichiro Al Tezza Ammar Laksono berhasil meraih juara 2 tingkat SD di Kejuaraan cabang PIMDA Open Tournament 15-16 November di Gedung Dakwah Muhammadiyah Tangsel."
    // },
  ];

  return NextResponse.json(prestasi);
}
