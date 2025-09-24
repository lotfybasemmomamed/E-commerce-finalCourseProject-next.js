import { NextRequest, NextResponse } from "next/server";
import  { AxiosError } from "axios";
import { getToken } from "next-auth/jwt";
import { getWishlistItems } from "@/app/_apis/whishlistApi";


export async function GET(req:NextRequest) {
  try {
    const token = await getToken({req});

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const res = await getWishlistItems(token.token as string);

    return NextResponse.json(res);
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return NextResponse.json(
      { error: error.response?.data ?? error.message },
      { status: 500 }
    );
  }
}


