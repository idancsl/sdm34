import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    const total = await prisma.pendaftar.count();
    const items = await prisma.pendaftar.findMany({
      orderBy: { nama: "asc" },
      skip,
      take: limit,
    });

    // ubah semua path file menjadi URL relatif
    const mapped = items.map((p) => ({
      ...p,
      akte: p.akte ? `/uploads/${p.akte}` : null,
      kk: p.kk ? `/uploads/${p.kk}` : null,
      ijazah: p.ijazah ? `/uploads/${p.ijazah}` : null,
      pasFoto: p.pasFoto ? `/uploads/${p.pasFoto}` : null,
      buktiPembayaran: p.buktiPembayaran
        ? `/uploads/${p.buktiPembayaran}`
        : null,
    }));

    return new Response(
      JSON.stringify({
        items: mapped,
        totalPages: Math.ceil(total / limit),
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Gagal ambil data" }), {
      status: 500,
    });
  }
}
