import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json(
      { error: "File tidak ditemukan" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name);
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}${ext}`;

  const uploadPath = path.join(
    process.cwd(),
    "public/uploads",
    fileName
  );

  await writeFile(uploadPath, buffer);

  return NextResponse.json({
    url: `/uploads/${fileName}`,
  });
}
