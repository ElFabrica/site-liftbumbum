import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "liftbumbum2025";
// Token é derivado da senha — em produção, use um valor aleatório seguro em .env
const ADMIN_TOKEN = `lb_${Buffer.from(ADMIN_PASSWORD).toString("base64")}`;

export function getAdminToken() {
  return ADMIN_TOKEN;
}

export function getAdminPassword() {
  return ADMIN_PASSWORD;
}

/** Verifica se a requisição tem o cookie de admin válido (Server Components / Route Handlers) */
export async function isAuthenticated() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    return token === ADMIN_TOKEN;
  } catch {
    return false;
  }
}
