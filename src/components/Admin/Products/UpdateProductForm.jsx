"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useUpdateProduct from "@/Hooks/Products/useUpdateProduct";
import useBrands from "@/Hooks/Brands/useBrands";
import useCategories from "@/Hooks/catigories/usecatergories";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import { toast } from "react-hot-toast";

export default function UpdateProductForm({ product }) {
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [stock, setStock] = useState(product?.stock || "");
  const [category, setCategory] = useState(product?.category?._id || "");
  const [brand, setBrand] = useState(product?.brand?._id || "");
  const [imageCover, setImageCover] = useState(null);
  const [images, setImages] = useState([]);

  const { mutate: updateProduct, isPending } = useUpdateProduct(
    product?._id || product?.id
  );
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoryError,
  } = useCategories();
  const {
    data: brands,
    isLoading: isLoadingBrands,
    error: brandError,
  } = useBrands();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !price || !stock || !category || !brand) {
      toast.error("Please fill all fields");
      return;
    }

    const payload = {
      productId: product?._id || product?.id,
      title,
      description,
      price,
      stock,
      category,
      brand,
      ...(imageCover && { imageCover }),
      images: images ? Array.from(images) : [],
    };

    updateProduct(payload, {
      onSuccess: () => toast.success("Product updated successfully!"),
      onError: (err) =>
        toast.error(err?.response?.data?.message || "Update failed"),
    });
  };

  if (isLoadingCategories || isLoadingBrands) return <Loading />;
  if (categoryError || brandError)
    return <Error error={categoryError || brandError} />;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto p-8 rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-700 to-gray-900  shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
      <h2 className="text-2xl font-semibold text-center text-blue-400 mb-4">
        Update Product
      </h2>

      <div className="space-y-2">
        <Label className="text-blue-300">Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-800 border-gray-700 text-blue-300 focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter product title"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-blue-300">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-800 border-gray-700 text-blue-300 focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter detailed description"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-blue-300">Price</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-800 border-gray-700 text-blue-300 focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Product price"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-blue-300">Stock</Label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="bg-gray-800 border-gray-700 text-blue-300 focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Available stock"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-blue-300">Category</Label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-blue-300">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.categories?.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-blue-300">Brand</Label>
          <Select onValueChange={setBrand} value={brand}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-blue-300">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands?.brands?.map((br) => (
                <SelectItem key={br._id} value={br._id}>
                  {br.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-blue-300">Cover Image (optional)</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageCover(e.target.files?.[0] || null)}
          className="bg-gray-800 border-gray-700 text-blue-300 file:text-gray-400"
        />
        {product?.imageCover?.secure_url && (
          <div className="flex justify-center mt-3">
            <img
              src={product.imageCover.secure_url}
              alt={product.title}
              className="w-40 h-40 rounded-lg border-2 border-blue-500 shadow-md object-cover hover:scale-105 transition-transform"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-blue-300">Additional Images (optional)</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
          className="bg-gray-800 border-gray-700 text-blue-300 file:text-gray-400"
        />
        {product?.images?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            {product.images.map((image) => (
              <img
                key={image._id || image.secure_url}
                src={image.secure_url}
                alt={product.title}
                className="w-24 h-24 rounded-md border border-blue-600 shadow-sm object-cover hover:scale-105 transition-transform"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full px-8 py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-blue-500/50">
          {isPending ? "Updating..." : "Update Product"}
        </Button>
      </div>
    </form>
  );
}
