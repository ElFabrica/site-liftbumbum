import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

// PUT /api/admin/tracking/[id] — atualiza um código de rastreamento (requer auth)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id))
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });

  try {
    const { type, name, code } = await req.json();
    const item = await prisma.trackingCode.update({
      where: { id },
      data: { type, name, code },
    });
    return NextResponse.json(item);
  } catch (e) {
    console.error("[tracking/PUT]", e);
    return NextResponse.json({ error: "Erro ao atualizar." }, { status: 500 });
  }
}

// DELETE /api/admin/tracking/[id] — remove um código de rastreamento (requer auth)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id))
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });

  try {
    await prisma.trackingCode.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[tracking/DELETE]", e);
    return NextResponse.json({ error: "Erro ao deletar." }, { status: 500 });
  }
}
