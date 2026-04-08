import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

// GET /api/admin/tracking — lista todos os códigos (público — TrackingProvider lê isso)
export async function GET() {
  try {
    const codes = await prisma.trackingCode.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(codes);
  } catch (e) {
    console.error("[tracking/GET]", e);
    return NextResponse.json([]); // retorna vazio se DB indisponível
  }
}

// POST /api/admin/tracking — adiciona um novo código (requer auth)
export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const { type, name, code } = await req.json();
    const count = await prisma.trackingCode.count();

    const item = await prisma.trackingCode.create({
      data: {
        type: type ?? "custom",
        name: name ?? "",
        code: code ?? "",
        sortOrder: count,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    console.error("[tracking/POST]", e);
    return NextResponse.json({ error: "Erro ao criar." }, { status: 500 });
  }
}
