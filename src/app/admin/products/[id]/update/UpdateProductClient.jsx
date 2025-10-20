"use client";

import useSpacificProduct from "@/Hooks/Products/useSpacificProduct";
import UpdateProductForm from "@/components/Admin/Products/UpdateProductForm";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default function UpdateProductClient({ productId }) {
  const { data, isLoading, isError, error } = useSpacificProduct(productId);
  const product = data?.product;

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;

  return <UpdateProductForm product={product} />;
}
