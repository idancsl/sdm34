import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const guru = await prisma.guru.findMany({ orderBy: { nama: "asc" } });
    return new Response(JSON.stringify(guru), { status: 200 });
  } catch (error) {
    console.error("ERROR GET /api/admin/guru:", error);
    return new Response(
      JSON.stringify({ message: "Gagal mengambil data guru" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    const newGuru = await prisma.guru.create({
      data,
    });

    return new Response(JSON.stringify(newGuru), { status: 201 });
  } catch (error) {
    console.error("ERROR POST /api/admin/guru:", error);
    return new Response(
      JSON.stringify({ message: "Gagal menambahkan guru", error: error.message }),
      { status: 400 }
    );
  }
}
