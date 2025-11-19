import { logout } from "@/actions/admin";

export async function GET(request: Request) {
  await logout();

  return new Response();
}
