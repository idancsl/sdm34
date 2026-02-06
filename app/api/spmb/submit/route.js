import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const namaRaw = formData.get("nama");
    const slugNama = namaRaw
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

    const uploadDir = path.join(
      process.cwd(),
      "public/uploads",
      slugNama
    );

    // BUAT FOLDER PER PENDAFTAR
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    async function saveFile(file, filename) {
      if (!file) return "";
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);
      return `${slugNama}/${filename}`;
    }

    const data = {
      nama: namaRaw,
      tempatLahir: formData.get("tempatLahir"),
      tanggalLahir: new Date(formData.get("tanggalLahir")),
      jenisKelamin: formData.get("jenisKelamin"),
      namaAyah: formData.get("namaAyah"),
      namaIbu: formData.get("namaIbu"),
      hp: formData.get("hp"),
      alamat: formData.get("alamat"),

      akte: await saveFile(formData.get("akte"), "akte.jpg"),
      kk: await saveFile(formData.get("kk"), "kk.jpg"),
      ijazah: await saveFile(formData.get("ijazah"), "ijazah.jpg"),
      pasFoto: await saveFile(formData.get("pasFoto"), "pasfoto.jpg"),
      buktiPembayaran: await saveFile(
        formData.get("buktiPembayaran"),
        "bukti-pembayaran.jpg"
      ),
    };

    await prisma.pendaftar.create({ data });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SPMB SUBMIT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal submit pendaftaran" },
      { status: 500 }
    );
  }
}
