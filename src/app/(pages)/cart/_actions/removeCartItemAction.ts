'use server'

import { deletCartItem } from "@/app/_apis/cartApi";
import { getTokenValue } from "@/app/_utilites/getTokenValue";
import { NextResponse } from "next/server";

export default async function removeCartItemAction(productId:string) {
      const token = await getTokenValue();
     if (!token)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 throw new Error("Unauthorized");
    const res = await deletCartItem(productId, token);
    return res
}






