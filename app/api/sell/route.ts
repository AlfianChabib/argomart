import { SellSchema } from "@/app/dashboard/sell/_components/SellForm";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as SellSchema & { kindeId: string; totalPrice: number };

  const createSell = await prisma.user.update({
    where: { kindeId: body.kindeId },
    data: {
      address: body.address,
      phone: body.phone,
      productSales: {
        create: {
          productType: body.type,
          pricePerKg: body.price,
          totalKg: body.totalWeight,
          totalPrice: body.totalPrice,
          status: "COMPLETED",
        },
      },
    },
  });

  if (!createSell) {
    return NextResponse.json({ message: "Gagal menjual produk!" }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Success, Petugas akan dikirim ke rumah anda untuk mengambil hasil pertanian anda." },
    { status: 200 }
  );
}
