import React from "react";
import { BiDollar, BiUser, BiShoppingBag } from "react-icons/bi";
import Chart from "./../../components/Admin/chart/Chart";

export default function AdminHome() {
  const overviewData = {
    title: " Orders , Users and Revenue",
    data: {
      labels: [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
      ],
      datasets: [
        {
          label: "Orders",
          data: [120, 180, 250, 300, 400, 550, 600, 750, 700, 900],
          borderColor: " rgba(255, 206, 86, 1)",
          backgroundColor: "rgba(255, 206, 86,0.3)",
          pointStyle: "circle",
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: "users",
          data: [80, 120, 160, 200, 250, 320, 400, 500, 550, 600],
          borderColor: "rgba(81,162,255,1)",
          backgroundColor: "rgba(81,162,255,0.3)",
          pointStyle: "circle",
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: "Revenue",
          data: [300, 450, 620, 750, 900, 1100, 1250, 1450, 1500, 1700],
          borderColor: " rgba(22,109,62,1)",
          backgroundColor: "rgba(22,109,62,0.3)",
          pointStyle: "circle",
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    },
  };
  const totalUsers = 1120;
  const totalOrders = 4453;
  const totalRevenue = 54458.98;
  return (
    <div className="flex gap-10 justify-center  items-center flex-col flex-wrap px-10 pb-10 mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-center text-blue-400">
          Admin Dashboard Content
        </h1>
        <p className="text-lg font-medium  text-gray-500 mt-3">
          Welcome back, Here's your dashboard overview.
        </p>
      </div>

      <div className="w-full bg-gradient-to-br from-gray-700 to-gray-900  md:w-3/4 flex items-center justify-center  p-8">
        <Chart data={overviewData.data} title={overviewData.title} />
      </div>

      <div className="w-full bg-gradient-to-br from-gray-700 to-gray-900  md:w-3/4 flex items-center justify-center flex-col gap-5  p-8">
        <div className="card w-full p-5 bg-yellow-200 border border-yellow-400 shadow-xl">
          <div className="card-body flex justify-between flex-wrap gap-3 text-yellow-700">
            <h2 className="card-title flex gap-1 items-center">
              <BiShoppingBag size={25} />
              Total Orders
            </h2>
            <p className="font-bold">{totalOrders}</p>
          </div>
        </div>

        <div className="card w-full p-5 bg-blue-300 border border-blue-400 shadow-xl">
          <div className="card-body flex justify-between flex-wrap gap-3 text-blue-700">
            <h2 className="card-title flex gap-1 items-center">
              <BiUser size={25} />
              Total Users
            </h2>
            <p className="font-bold">{totalUsers}</p>
          </div>
        </div>

        <div className="card w-full p-5 bg-green-300 border border-green-400 shadow-xl">
          <div className="card-body flex justify-between flex-wrap gap-3 text-green-700">
            <h2 className="card-title flex gap-1 items-center">
              <BiDollar size={25} />
              Total Revenue
            </h2>
            <p className="font-bold">${totalRevenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
