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

import useAddProduct from "@/Hooks/Products/useAddProduct";
import useBrands from "@/Hooks/Brands/useBrands";
import useCategories from "@/Hooks/catigories/usecatergories";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [imageCover, setImageCover] = useState(null);
  const [images, setImages] = useState([]);

  const { mutate: addProduct, isPending } = useAddProduct();
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
      alert("Please fill all fields");
      return;
    }
    if (!imageCover) {
      alert("Please select a cover image");
      return;
    }

    addProduct({
      title,
      description,
      price,
      stock,
      category,
      brand,
      imageCover,
      images: images ? Array.from(images) : [],
    });
  };

  if (isLoadingCategories || isLoadingBrands) return <Loading />;
  if (categoryError || brandError)
    return <Error error={categoryError || brandError} />;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-10 bg-gradient-to-b from-gray-700 to-gray-900   text-gray-100 p-8 rounded-2xl shadow-lg border border-gray-700 space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-4">
        Add New Product
      </h2>

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-300">Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg"
          placeholder="Product title..."
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-300">
          Description
        </Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg"
          placeholder="Describe your product..."
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-300">Price</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg"
            placeholder="Enter price"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-300">Stock</Label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg"
            placeholder="Available quantity"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-300">
            Category
          </Label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-100 border border-gray-700">
              {categories?.categories?.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-300">Brand</Label>
          <Select onValueChange={setBrand} value={brand}>
            <SelectTrigger className="bg-gray-800 border border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-100 border border-gray-700">
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
        <Label className="text-sm font-semibold text-gray-300">
          Cover Image
        </Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageCover(e.target.files?.[0] || null)}
          className="bg-gray-800 border border-gray-700 text-gray-300 file:bg-gray-700 file:border-none file:px-3 file:py-2 file:rounded-lg file:text-gray-200 hover:file:bg-gray-600 cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-300">
          Additional Images
        </Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
          className="bg-gray-800 border border-gray-700 text-gray-300 file:bg-gray-700 file:border-none file:px-3 file:py-2 file:rounded-lg file:text-gray-200 hover:file:bg-gray-600 cursor-pointer"
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-all duration-200 disabled:opacity-50">
          {isPending ? "Adding..." : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
