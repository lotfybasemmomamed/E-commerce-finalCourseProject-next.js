import Checkout from "../_components/Checkout";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CheckOutPage({ params }: PageProps) {
  const cartId = params.id;

  return <Checkout cartId={cartId} />;
}
