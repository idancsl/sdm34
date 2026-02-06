export async function GET() {
  return Response.json([
    {
      id: 1,
      name: "Pramuka",
      schedule: "Jumat • 14.00 – 16.00",
      description: "Melatih kemandirian, kepemimpinan, dan cinta alam.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5a/Pramuka_Indonesia.jpg",
    },
    {
      id: 2,
      name: "Futsal",
      schedule: "Rabu • 15.00 – 17.00",
      description: "Mengembangkan bakat olahraga dan kerja sama tim.",
      image:
        "https://images.unsplash.com/photo-1518091043644-c1d4457512c6",
    },
    {
      id: 3,
      name: "Tahfidz",
      schedule: "Senin & Kamis • 14.00",
      description: "Membentuk generasi Qurani sejak dini.",
      image:
        "https://images.unsplash.com/photo-1609599006353-e629aaabfeae",
    },
    {
      id: 4,
      name: "Drumband",
      schedule: "Sabtu • 07.00 – 09.00",
      description: "Melatih disiplin, kekompakan, dan musikalitas.",
      image:
        "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
    },
    {
      id: 5,
      name: "Kaligrafi",
      schedule: "Selasa • 14.00 – 16.00",
      description: "Mengembangkan seni tulis Islam dan kreativitas siswa.",
      image:
        "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    },
    {
      id: 6,
      name: "Pencak Silat",
      schedule: "Kamis • 15.00 – 17.00",
      description: "Membentuk fisik, mental, dan karakter siswa.",
      image:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
    },
  ]);
}
