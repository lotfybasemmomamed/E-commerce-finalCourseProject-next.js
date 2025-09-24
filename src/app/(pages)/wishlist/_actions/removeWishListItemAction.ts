'use server'

import { deletWhishListItem } from "@/app/_apis/whishlistApi";
import { getTokenValue } from "@/app/_utilites/getTokenValue";

export default async function removeWishListItemAction(productId:string) {
      const token = await getTokenValue();
     if (!token)
 throw new Error("Unauthorized");
    const res = await deletWhishListItem(productId, token);
    return res
}






