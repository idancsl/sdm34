import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();

  // Ambil semua field
  const keys = [
    "nama",
    "tempatLahir",
    "tanggalLahir",
    "jenisKelamin",
    "namaAyah",
    "namaIbu",
    "hp",
    "alamat",
    "akte",
    "kk",
    "ijazah",
    "pasFoto",
    "buktiPembayaran",
  ];

  const data = {};
  for (let key of keys) {
    const value = formData.get(key);
    data[key] = value;
  }

  // Folder XLSX
  const folder = path.resolve("./public/xlsx");
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  const filePath = path.join(folder, "spmb.xlsx");

  let workbook;
  let worksheet;

  if (fs.existsSync(filePath)) {
    workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    worksheet = workbook.getWorksheet("Pendaftar");
  } else {
    workbook = new ExcelJS.Workbook();
    worksheet = workbook.addWorksheet("Pendaftar");
    worksheet.addRow([
      "Tanggal Daftar",
      "Nama",
      "TTL",
      "Jenis Kelamin",
      "Nama Ayah",
      "Nama Ibu",
      "HP",
      "Alamat",
      "Akte",
      "KK",
      "Ijazah",
      "Pas Foto",
      "Bukti Pembayaran",
    ]);
  }

  const tanggalDaftar = new Date().toLocaleString("id-ID");

  // Simpan semua file ke folder xlsx
  const savedFiles = {};
  for (let key of ["akte", "kk", "ijazah", "pasFoto", "buktiPembayaran"]) {
    const file = data[key];
    if (file && file.size) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}_${file.name}`;
      fs.writeFileSync(path.join(folder, fileName), buffer);
      savedFiles[key] = fileName;
    } else {
      savedFiles[key] = "";
    }
  }

  worksheet.addRow([
    tanggalDaftar,
    data.nama,
    `${data.tempatLahir}, ${data.tanggalLahir}`,
    data.jenisKelamin,
    data.namaAyah,
    data.namaIbu,
    data.hp,
    data.alamat,
    savedFiles.akte,
    savedFiles.kk,
    savedFiles.ijazah,
    savedFiles.pasFoto,
    savedFiles.buktiPembayaran,
  ]);

  await workbook.xlsx.writeFile(filePath);

  return NextResponse.json({ success: true });
}
