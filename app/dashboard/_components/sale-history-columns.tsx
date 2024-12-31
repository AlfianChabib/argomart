"use client";

import { ProductSale } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProductSale>[] = [
  {
    accessorKey: "productType",
    header: "Jenis",
  },
  {
    accessorKey: "pricePerKg",
    header: "Price Per Kg",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("pricePerKg"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "totalKg",
    header: "Total Kg",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "unit",
        unit: "kilogram",
      }).format(amount);

      return <div className="font-medium whitespace-nowrap">{formatted}</div>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
