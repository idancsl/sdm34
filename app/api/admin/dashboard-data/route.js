import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    // Hitung jumlah guru laki-laki dan perempuan
    const guruLaki = await prisma.guru.count({ where: { jenisKelamin: "Laki-laki"  } });
    const guruPerempuan = await prisma.guru.count({ where: { jenisKelamin: "Perempuan" } });

    // Hitung total pendaftar laki-laki dan perempuan
    const pendaftarLaki = await prisma.pendaftar.count({ where: { jenisKelamin: "Laki-laki" } });
    const pendaftarPerempuan = await prisma.pendaftar.count({ where: { jenisKelamin: "Perempuan" } });

    return new Response(
      JSON.stringify({
        guru: { L: guruLaki, P: guruPerempuan },
        pendaftar: { L: pendaftarLaki, P: pendaftarPerempuan },
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error dashboard-data:", err);
    return new Response(JSON.stringify({ error: "Gagal ambil data" }), { status: 500 });
  }
}
