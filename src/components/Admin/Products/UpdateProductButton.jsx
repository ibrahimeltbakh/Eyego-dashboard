import React from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineEditNote } from "react-icons/md";
import Link from "next/link";

export default function UpdateProductButton({ productId }) {
  return (
    <Link href={`/admin/products/${productId}/update`}>
      <Button className="bg-transparent  cursor-pointer text-blue-600 hover:text-blue-400 hover:border hover:border-blue-600  hover:bg-transparent focus:outline-none">
        <MdOutlineEditNote />
      </Button>
    </Link>
  );
}
