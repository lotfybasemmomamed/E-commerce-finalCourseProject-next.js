import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { AxiosError } from "axios";

const baseUrl = "https://ecommerce.routemisr.com/api/v1";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getToken({ req: request });
    if (!token || !("token" in token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    const resolvedParams = await params;

    const res = await axios.put(`${baseUrl}/cart/${resolvedParams.id}`, body, {
      headers: {
        token: token.token as string,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return NextResponse.json(
      { error: error.response?.data ?? error.message },
      { status: 500 }
    );
  }
}