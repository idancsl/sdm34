import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const guru = await prisma.guru.findMany();
    return Response.json(guru);
  } catch (error) {
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
    return new Response(
      JSON.stringify({ message: "Gagal menambahkan guru" }),
      { status: 400 }
    );
  }
}
