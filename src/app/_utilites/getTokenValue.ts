import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getTokenValue() {
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token")?.value;

  if (!token) {
    redirect("/login");
  }

  return token;
}
