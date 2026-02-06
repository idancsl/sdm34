import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

// Supabase client (Service Role Key wajib untuk server)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Helper upload file ke Supabase Storage
async function uploadFileToSupabase(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("guru") // bucket "guru"
    .upload(fileName, buffer, { contentType: file.type, upsert: true });

  if (error) throw new Error("Gagal upload foto");

  const { publicUrl } = supabase.storage.from("guru").getPublicUrl(fileName);
  return publicUrl;
}

export async function GET() {
  try {
    const guru = await prisma.guru.findMany({ orderBy: { name: "asc" } });
    return new Response(JSON.stringify(guru), { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/guru error:", error);
    return new Response(JSON.stringify({ message: "Gagal mengambil data guru" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const subject = formData.get("subject");
    const jenisKelamin = formData.get("jenisKelamin");
    const file = formData.get("photoFile");

    if (!name || !subject || !jenisKelamin) {
      return new Response(JSON.stringify({ message: "Data wajib diisi" }), { status: 400 });
    }

    let photoUrl = "";
    if (file) {
      photoUrl = await uploadFileToSupabase(file);
    }

    const newGuru = await prisma.guru.create({
      data: { name, subject, jenisKelamin, photo: photoUrl },
    });

    return new Response(JSON.stringify(newGuru), { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/guru error:", error);
    return new Response(JSON.stringify({ message: "Gagal menambahkan guru" }), { status: 400 });
  }
}

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const id = formData.get("id");
    const name = formData.get("name");
    const subject = formData.get("subject");
    const jenisKelamin = formData.get("jenisKelamin");
    const file = formData.get("photoFile");

    let photoUrl = formData.get("photo") || "";

    if (file) {
      photoUrl = await uploadFileToSupabase(file);
    }

    const updatedGuru = await prisma.guru.update({
      where: { id: parseInt(id) },
      data: { name, subject, jenisKelamin, photo: photoUrl },
    });

    return new Response(JSON.stringify(updatedGuru), { status: 200 });
  } catch (error) {
    console.error("PUT /api/admin/guru error:", error);
    return new Response(JSON.stringify({ message: "Gagal memperbarui guru" }), { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID tidak ditemukan");

    await prisma.guru.delete({ where: { id: parseInt(id) } });

    return new Response(JSON.stringify({ message: "Guru berhasil dihapus" }), { status: 200 });
  } catch (error) {
    console.error("DELETE /api/admin/guru error:", error);
    return new Response(JSON.stringify({ message: "Gagal menghapus guru" }), { status: 400 });
  }
}
