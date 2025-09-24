'use server'
import { addToWhishList } from "@/app/_apis/whishlistApi";
import { getTokenValue } from "@/app/_utilites/getTokenValue";
import { NextResponse } from "next/server";



export default async function addToWishListAction(productId:string){
     const token = await getTokenValue();
    
      if (!token){
       NextResponse.json({ error: "Unauthorized" }, { status: 401 })
       return
    }
    const res = await addToWhishList(productId, token);
    return res

}