import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

// GET /api/admin/data — retorna os dados do site (público — página principal lê isso)
export async function GET() {
  try {
    const record = await prisma.siteData.findUnique({ where: { id: 1 } });
    return NextResponse.json(record?.data ?? {});
  } catch (e) {
    console.error("[data/GET]", e);
    return NextResponse.json({}, { status: 200 }); // retorna vazio se DB indisponível
  }
}

// POST /api/admin/data — salva dados do site (requer auth)
export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const body = await req.json();

    const record = await prisma.siteData.upsert({
      where: { id: 1 },
      update: { data: body },
      create: { id: 1, data: body },
    });

    return NextResponse.json(record.data);
  } catch (e) {
    console.error("[data/POST]", e);
    return NextResponse.json({ error: "Erro ao salvar." }, { status: 500 });
  }
}
