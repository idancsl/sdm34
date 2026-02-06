import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Ambil semua field
    const fields = [
      "nama",
      "tempatLahir",
      "tanggalLahir",
      "jenisKelamin",
      "namaAyah",
      "namaIbu",
      "hp",
      "alamat",
    ];

    const data = {};
    for (let f of fields) {
      data[f] = formData.get(f);
    }

    // Upload file ke Supabase Storage
    const fileFields = ["akte", "kk", "ijazah", "pasFoto", "buktiPembayaran"];
    for (let f of fileFields) {
      const file = formData.get(f);
      if (!file) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${f}.${fileExt}`;

      const { data: uploadData, error } = await supabase.storage
        .from("spmb")
        .upload(fileName, buffer, { cacheControl: "3600", upsert: true });

      if (error) throw error;

      const { publicUrl } = supabase.storage
        .from("spmb")
        .getPublicUrl(uploadData.path);

      data[f] = publicUrl;
    }

    // Save to database
    data.tanggalLahir = new Date(data.tanggalLahir);
    await prisma.pendaftar.create({ data });

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error("SPMB SUBMIT ERROR:", err);
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
    });
  }
}
