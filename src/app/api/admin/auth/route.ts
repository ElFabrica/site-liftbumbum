import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

// GET /api/admin/auth — verifica se o cookie de admin é válido
export async function GET() {
  return NextResponse.json({ authed: isAuthenticated() });
}
