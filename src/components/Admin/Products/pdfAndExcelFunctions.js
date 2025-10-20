"use client";

import * as XLSX from "xlsx";
import pdfMake from "@/lib/pdfMakeSetup";


export const exportToPDF = (products) => {
  const tableBody = [
    ["Title", "Price", "Stock", "Sold"],
    ...products.map((p) => [
      p.title || "N/A",
      p.price?.toString() || "0",
      p.stock?.toString() || "0",
      p.sold?.toString() || "0",
    ]),
  ];

  const docDefinition = {
    content: [
      { text: "Products Report", style: "header" },
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto", "auto"],
          body: tableBody,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
  };

  pdfMake.createPdf(docDefinition).download("products.pdf");
};


export const exportToExcel = (products) => {
  const worksheet = XLSX.utils.json_to_sheet(products);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  XLSX.writeFile(workbook, "products.xlsx");
};