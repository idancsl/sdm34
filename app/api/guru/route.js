  import { prisma } from "@/lib/prisma";

  export async function GET() {
    const guru = await prisma.guru.findMany();
    return new Response(JSON.stringify(guru), { status: 200 });
  }

  export async function POST(req) {
    const data = await req.json();
    const newGuru = await prisma.guru.create({ data });
    return new Response(JSON.stringify(newGuru), { status: 201 });
  }
