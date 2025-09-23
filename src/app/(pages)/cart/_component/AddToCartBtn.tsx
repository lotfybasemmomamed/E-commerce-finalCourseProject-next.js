import { Button } from "@/components/ui/button";

export default function AddToCartBtn({width="",height=""}) {
  return <Button className={`${width} ${height}btn px-4 py-2 rounded`}>Add to Cart</Button>;
}
