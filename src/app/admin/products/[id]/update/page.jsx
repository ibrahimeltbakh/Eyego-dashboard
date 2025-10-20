import UpdateProductClient from "./UpdateProductClient";

export default async function UpdateProductPage({ params }) {
  const productId = (await params)?.id;
  return <UpdateProductClient productId={productId} />;
}
