"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import UpdateProductButton from "./UpdateProductButton";
import RemoveProductButton from "./RemoveProductButton";
import { getUser } from "@/lib/features/auth/authSlice";

export default function ProductsTable({ products = [] }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, []);

  const tableHead = [
    { title: "Name", key: "name" },
    { title: "Price", key: "price" },
    { title: "Stock", key: "stock" },
    { title: "Sold", key: "sold" },
    { title: "Image", key: "image" },
  ];

  if (user?.user.role === "admin")
    tableHead.push({ title: "Actions", key: "actions" });
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const selectedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-gradient-to-r from-gray-700 to-gray-800 py-5 rounded-lg shadow-md ">
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        <Table className="min-w-full text-sm sm:text-base text-center ">
          <TableHeader>
            <TableRow>
              {tableHead.map((item) => (
                <TableHead
                  key={item.key}
                  className="px-6 py-3 text-center font-semibold uppercase tracking-wide">
                  {item.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-border">
            {selectedProducts.map((product) => (
              <TableRow
                key={product?._id}
                className="hover:bg-gray-700 transition-colors text-center">
                <TableCell className="px-6 py-3">{product?.title}</TableCell>
                <TableCell className="px-6 py-3">{product?.price}</TableCell>
                <TableCell className="px-6 py-3">{product?.stock}</TableCell>
                <TableCell className="px-6 py-3">{product?.sold}</TableCell>
                <TableCell className="px-6 py-3">
                  <img
                    src={product?.imageCover?.secure_url}
                    alt={product?.title}
                    width={50}
                    height={50}
                    className="rounded-md mx-auto"
                  />
                </TableCell>
                {user?.user.role === "admin" && (
                  <TableCell className="px-6 py-3">
                    <UpdateProductButton
                      productId={product?._id || product?.id}
                    />
                    <RemoveProductButton
                      productId={product?._id || product?.id}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap  justify-center items-center  gap-2 mt-4">
        <Button
          variant="outline"
          className="border-blue-400"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          Previous
        </Button>

        {[...Array(totalPages)].map((_, idx) => (
          <Button
            key={idx}
            variant={currentPage === idx + 1 ? "default" : "outline"}
            className={
              currentPage === idx + 1
                ? "bg-blue-400 text-white"
                : "border-blue-400"
            }
            onClick={() => setCurrentPage(idx + 1)}>
            {idx + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          className="border-blue-400"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
