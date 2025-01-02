import { BuySchema } from "@/app/dashboard/products/_components/Buy";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as BuySchema & { kindeId: string; totalPrice: number };

  const createOrder = await prisma.user.update({
    where: { kindeId: payload.kindeId },
    data: {
      address: payload.address,
      phone: payload.phone,
      orders: {
        create: {
          productId: payload.productId,
          count: payload.count,
          totalPrice: payload.totalPrice,
          status: "COMPLETED",
        },
      },
    },
  });

  if (!createOrder) {
    return NextResponse.json({ message: "Gagal membeli produk!" }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Success, Barang akan dikirim ke rumah anda dan siapkan pembayaran." },
    { status: 200 }
  );
}
