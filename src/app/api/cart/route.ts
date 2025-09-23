import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { getServerSession } from "next-auth";
import { decode } from "next-auth/jwt";

const baseUrl = "https://ecommerce.routemisr.com/api/v1";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    
    const session = await getServerSession();
    console.log("Session:", session);

    const sessionToken = cookieStore.get("next-auth.session-token")?.value ||
                        cookieStore.get("__Secure-next-auth.session-token")?.value;
    
    console.log("Encrypted Token:", sessionToken);

    let decodedToken = null;
    
    if (sessionToken) {
      try {
        decodedToken = await decode({
          token: sessionToken,
          secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
        });
        console.log("Decoded Token:", decodedToken);
      } catch (decodeError) {
        console.error("Token decode error:", decodeError);
      }
    }

    const userToken = cookieStore.get("user-token")?.value || 
                     cookieStore.get("auth-token")?.value ||
                     cookieStore.get("token")?.value;

    const finalToken = decodedToken?.accessToken || 
                      decodedToken?.token ||
                      session?.accessToken ||
                      userToken;

    console.log("Final Token to use:", finalToken);
    console.log("All available cookies:", cookieStore.getAll().map(c => c.name));

    if (!finalToken) {
      return NextResponse.json({ 
        error: "Unauthorized - No valid token found",
        availableCookies: cookieStore.getAll().map(c => c.name)
      }, { status: 401 });
    }

    const res = await axios.get(`${baseUrl}/cart`, {
      headers: { 
        token: finalToken,
        'Content-Type': 'application/json'
      },
    });

    console.log("API Response:", res.data);
    return NextResponse.json(res.data);
    
  } catch (err: any) {
    console.error("Cart API Error:", err.response?.data || err.message);
    
    if (err.response?.status === 401) {
      return NextResponse.json({ 
        error: "Unauthorized - Token is invalid or expired",
        details: err.response?.data 
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: "Failed to fetch cart",
      details: err.response?.data || err.message 
    }, { status: 500 });
  }
}