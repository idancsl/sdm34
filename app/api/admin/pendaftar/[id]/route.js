import { prisma } from "@/lib/prisma";

export async function PUT(req, { params }) {
  // **await params** karena params sekarang promise
  const { id } = await params; // ini wajib di App Router terbaru

  try {
    const body = await req.json();
    const { verified } = body;

    const updated = await prisma.pendaftar.update({
      where: { id }, // id sekarang string (UUID)
      data: { verified },
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.error("Gagal update verifikasi:", err);
    return new Response(JSON.stringify({ error: "Gagal update verifikasi" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    await prisma.pendaftar.delete({ where: { id } });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Gagal hapus pendaftar:", err);
    return new Response(JSON.stringify({ error: "Gagal hapus pendaftar" }), {
      status: 500,
    });
  }
}
