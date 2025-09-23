import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { decode } from "next-auth/jwt";
import { getServerSession } from "next-auth";

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

  return decodedToken?.accessToken || decodedToken?.token || session?.accessToken || userToken;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = await getToken();
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json(); 

    const res = await axios.put(`${baseUrl}/cart/${params.id}`, body, {
      headers: { token, "Content-Type": "application/json" },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("Update cart item error:", err.response?.data || err.message);
    return NextResponse.json({ error: err.response?.data || err.message }, { status: 500 });
  }
}
