"use client";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import { fetchProducts } from "@/lib/features/products/productsSlice";
import React, { useEffect, useState } from "react";
import ProductsTable from "../../../components/Admin/Products/ProductsTable";
import { useDispatch, useSelector } from "react-redux";
import Actions from "./../../../components/Admin/Products/Actions";

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  if (error) {
    return <Error error={error} />;
  }
  if (loading) {
    return <Loading />;
  }
  if (products?.count === 0) {
    return (
      <div className="sm:container m-auto flex flex-col justify-center gap-3 items-center mt-10">
        <h2>Your Products is empty</h2>
      </div>
    );
  }

  return (
    <div className="sm:container flex flex-col justify-center  items-center gap-6 mt-10 ">
      <h1 className="text-blue-400 text-3xl font-extrabold text-center ">
        Your Products
      </h1>
      <Actions
        products={products}
        setFilteredProducts={setFilteredProducts}
        filteredProducts={filteredProducts}
      />
      <ProductsTable products={filteredProducts} />
    </div>
  );
}
