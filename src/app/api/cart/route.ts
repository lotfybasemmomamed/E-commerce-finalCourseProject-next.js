import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { getServerSession } from "next-auth";
import { decode } from "next-auth/jwt";

const baseUrl = "https://ecommerce.routemisr.com/api/v1";

async function getToken() {
  const cookieStore = cookies();
  const session = await getServerSession();

  const sessionToken = cookieStore.get("next-auth.session-token")?.value ||
                       cookieStore.get("__Secure-next-auth.session-token")?.value;

  let decodedToken = null;
  if (sessionToken) {
    decodedToken = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
    });
  }

  const userToken = cookieStore.get("user-token")?.value || 
                    cookieStore.get("auth-token")?.value ||
                    cookieStore.get("token")?.value;

  const finalToken = decodedToken?.accessToken || decodedToken?.token || session?.accessToken || userToken;
  return finalToken;
}

export async function GET() {
  try {
    const token = await getToken();
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const res = await axios.get(`${baseUrl}/cart`, {
      headers: { token, "Content-Type": "application/json" },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.response?.data || err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json(); 
    const token = await getToken();
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const res = await axios.post(`${baseUrl}/cart`, body, {
      headers: { token, "Content-Type": "application/json" },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.response?.data || err.message }, { status: 500 });
  }
}
