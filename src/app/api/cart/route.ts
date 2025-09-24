import { NextRequest, NextResponse } from "next/server";
import  { AxiosError } from "axios";
import {  getCartItems } from "@/app/_apis/cartApi";
import { getToken } from "next-auth/jwt";


export async function GET(req:NextRequest) {
  try {
    const token = await getToken({req});

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const res = await getCartItems(token.token as string);

    return NextResponse.json(res);
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return NextResponse.json(
      { error: error.response?.data ?? error.message },
      { status: 500 }
    );
  }
}


