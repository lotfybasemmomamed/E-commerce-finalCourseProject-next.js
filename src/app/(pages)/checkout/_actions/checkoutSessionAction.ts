'use server'
import { checkoutSessionApi } from "@/app/_apis/checkoutSessionApi";
import { CheckoutFormValues } from "@/app/_schemas/checkoutFormSchema";
import { getTokenValue } from "@/app/_utilites/getTokenValue";
import { NextResponse } from "next/server";



export default async function checkoutSessionAction(cartId:string,data:CheckoutFormValues){
     const token = await getTokenValue();
     if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const res = await checkoutSessionApi(cartId, token,data);
    return res

}