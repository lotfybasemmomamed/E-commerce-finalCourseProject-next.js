'use server'
import { addToCart } from "@/app/_apis/cartApi";
import { getTokenValue } from "@/app/_utilites/getTokenValue";
import { NextResponse } from "next/server";



export default async function addToVCartAction(productId:string){
     const token = await getTokenValue();
     if (!token){
       NextResponse.json({ error: "Unauthorized" }, { status: 401 })
       return
    }
    const res = await addToCart(productId, token);
    return res

}