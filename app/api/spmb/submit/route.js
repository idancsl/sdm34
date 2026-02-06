import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const nama = formData.get("nama");
    if (!nama) throw new Error("Nama wajib diisi");

    const slugNama = nama
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

    async function uploadFile(file, filename) {
      if (!file) return null;

      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = `pendaftar/${slugNama}/${filename}`;

      console.log("UPLOAD PATH:", filePath);

      const { error } = await supabaseServer.storage
        .from("spmb")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (error) {
        console.error("UPLOAD ERROR:", error);
        throw error;
      }

      return `${process.env.SUPABASE_URL}/storage/v1/object/public/spmb/${filePath}`;
    }

    const data = {
      nama,
      tempatLahir: formData.get("tempatLahir"),
      tanggalLahir: new Date(formData.get("tanggalLahir")),
      jenisKelamin: formData.get("jenisKelamin"),
      namaAyah: formData.get("namaAyah"),
      namaIbu: formData.get("namaIbu"),
      hp: formData.get("hp"),
      alamat: formData.get("alamat"),

      pasFoto: await uploadFile(formData.get("pasFoto"), "pasfoto.jpg"),
      akte: await uploadFile(formData.get("akte"), "akte.jpg"),
      kk: await uploadFile(formData.get("kk"), "kk.jpg"),
      ijazah: await uploadFile(formData.get("ijazah"), "ijazah.jpg"),
      buktiPembayaran: await uploadFile(
        formData.get("buktiPembayaran"),
        "bukti-pembayaran.jpg"
      ),
    };

    await prisma.pendaftar.create({ data });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SPMB SUBMIT ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
