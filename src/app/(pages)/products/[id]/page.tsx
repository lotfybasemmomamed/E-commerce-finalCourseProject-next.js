import SingleProduct from "./_component/SingleProduct";

export default async function SingleProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 

  return (
    <div>
      <SingleProduct id={id} />
    </div>
  );
}
