import { NextResponse } from "next/server";

export async function GET() {
  const news = [
    {
      id: 1,
      title: "SD Muhammadiyah 34 Raih Juara Lomba Matematika",
      media: "/img/news-math.jpg", // gambar
      type: "image", // type bisa 'image' atau 'video'
      summary: "Siswa SD Muhammadiyah 34 berhasil meraih juara 1 lomba matematika tingkat kecamatan.",
      date: "2026-01-15",
      link: "#"
    },
    {
      id: 2,
      title: "Kegiatan Bakti Sosial Siswa",
      media: "/video/news-baksos.mp4", // video lokal
      type: "video",
      summary: "Siswa mengadakan bakti sosial ke panti asuhan sebagai bagian dari pengembangan karakter.",
      date: "2026-01-10",
      link: "#"
    },
    {
      id: 3,
      title: "Pentas Seni Tahunan Sekolah",
      media: "https://www.youtube.com/embed/dQw4w9WgXcQ", // video YouTube
      type: "youtube",
      summary: "Acara pentas seni tahunan menampilkan berbagai karya kreatif siswa dan menarik perhatian orang tua.",
      date: "2025-12-25",
      link: "#"
    }
  ];

  return NextResponse.json(news);
}
