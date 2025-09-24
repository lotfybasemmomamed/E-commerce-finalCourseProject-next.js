'use server'

import { deletCartItem } from "@/app/_apis/cartApi";
import { getTokenValue } from "@/app/_utilites/getTokenValue";

export default async function removeCartItemAction(productId:string) {
      const token = await getTokenValue();
     if (!token)
 throw new Error("Unauthorized");
    const res = await deletCartItem(productId, token);
    return res
}






