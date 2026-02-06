import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import axios from "axios";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const EXCEL_PATH = "./public/data/spmb.xlsx";
const PDF_PATH = "./public/data/";

export async function POST(req) {
  const form = new formidable.IncomingForm({ multiples: false });
  form.uploadDir = "./public/uploads";
  form.keepExtensions = true;

  return new Promise((resolve) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return resolve(NextResponse.json({ error: err.message }, { status: 500 }));

      try {
        // 1️⃣ Simpan ke Excel
        const workbook = new ExcelJS.Workbook();
        if (fs.existsSync(EXCEL_PATH)) {
          await workbook.xlsx.readFile(EXCEL_PATH);
        } else {
          const sheet = workbook.addWorksheet("SPMB");
          sheet.addRow([
            "Nama", "Tempat Lahir", "Tanggal Lahir", "Jenis Kelamin",
            "Nama Ayah", "Nama Ibu", "HP", "Alamat", "Akte", "KK", "Ijazah", "Pas Foto"
          ]);
        }
        const sheet = workbook.getWorksheet("SPMB") || workbook.addWorksheet("SPMB");
        sheet.addRow([
          fields.nama,
          fields.tempatLahir,
          fields.tanggalLahir,
          fields.jenisKelamin,
          fields.namaAyah,
          fields.namaIbu,
          fields.hp,
          fields.alamat,
          files.akte.newFilename,
          files.kk.newFilename,
          files.ijazah.newFilename,
          files.foto.newFilename,
        ]);
        await workbook.xlsx.writeFile(EXCEL_PATH);

        // 2️⃣ Generate PDF
        const pdfFile = path.join(PDF_PATH, `${fields.nama.replace(/\s/g, "_")}.pdf`);
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(pdfFile));
        doc.fontSize(20).text("Formulir Pendaftaran SPMB", { align: "center" });
        doc.moveDown();
        Object.keys(fields).forEach((key) => {
          doc.fontSize(12).text(`${key}: ${fields[key]}`);
        });
        doc.end();

        // 3️⃣ Kirim WhatsApp via Cloud API
        const phoneNumber = fields.hp; // pastikan nomor WA
        const token = process.env.WA_TOKEN;
        const phoneId = process.env.WA_PHONE_ID;

        await axios.post(
          `https://graph.facebook.com/v17.0/${phoneId}/messages`,
          {
            messaging_product: "whatsapp",
            to: phoneNumber,
            type: "document",
            document: {
              link: `https://yourdomain.com/data/${path.basename(pdfFile)}`,
              caption: "Formulir pendaftaran SPMB"
            }
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        resolve(NextResponse.json({ success: true }));
      } catch (error) {
        console.log(error);
        resolve(NextResponse.json({ error: error.message }, { status: 500 }));
      }
    });
  });
}
