import React from "react";
import { BiDollar, BiDollarCircle, BiShoppingBag } from "react-icons/bi";

export default function AdminHome() {
  const hreftalSales = 54458.98;
  const averageOrder = 120.45;
  const hreftalOrders = 453;

  return (
    <div className="flex gap-10 justify-center items-center flex-wrap px-10 pb-10 mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-center text-blue-400">
          Admin Dashboard Content
        </h1>
        <p className="text-lg font-medium text-muted-foreground text-gray-500 mt-3">
          Welcome back, Here's your dashboard overview.
        </p>
      </div>

      {/* hreftal Sales */}
      <div className="card w-full p-5 bg-green-100 border border-green-300 shadow-xl">
        <div className="card-body flex justify-between flex-wrap gap-3 text-green-800">
          <h2 className="card-title flex gap-1 items-center">
            <BiDollar size={25} />
            hreftal Sales
          </h2>
          <p className="font-bold">${hreftalSales}</p>
        </div>
      </div>

      {/* Average Order */}
      <div className="card w-full p-5 bg-yellow-100 border border-yellow-300 shadow-xl">
        <div className="card-body flex justify-between flex-wrap gap-3 text-yellow-800">
          <h2 className="card-title flex gap-1 items-center">
            <BiDollarCircle size={25} />
            Average Order
          </h2>
          <p className="font-bold">${averageOrder}</p>
        </div>
      </div>

      {/* hreftal Orders */}
      <div className="card w-full p-5 bg-blue-100 border border-blue-300 shadow-xl">
        <div className="card-body flex justify-between flex-wrap gap-3 text-blue-800">
          <h2 className="card-title flex gap-1 items-center">
            <BiShoppingBag size={25} />
            hreftal Orders
          </h2>
          <p className="font-bold">{hreftalOrders}</p>
        </div>
      </div>
    </div>
  );
}
