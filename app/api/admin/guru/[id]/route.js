import { prisma } from "@/lib/prisma";

export async function GET(req, context) {
  const { id } = await context.params;

  const guru = await prisma.guru.findUnique({
    where: { id: Number(id) },
  });

  if (!guru) {
    return Response.json(
      { message: "Guru tidak ditemukan" },
      { status: 404 }
    );
  }

  return Response.json(guru);
}

export async function PUT(req, context) {
  try {
    const { id } = await context.params;
    const data = await req.json();

    const updatedGuru = await prisma.guru.update({
      where: { id: Number(id) },
      data,
    });

    return Response.json(updatedGuru);
  } catch (error) {
    return Response.json(
      { message: "Gagal mengupdate guru" },
      { status: 400 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    await prisma.guru.delete({
      where: { id: Number(id) },
    });

    return Response.json(
      { message: "Guru berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Gagal menghapus guru" },
      { status: 400 }
    );
  }
}
