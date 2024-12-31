import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProductSale } from "@prisma/client";
import { MapPinHouse, Phone } from "lucide-react";
import Image from "next/image";
import SaleHistory from "./_components/SaleHistory";

export const dynamic = "force-dynamic";

const getTotalSale = (itemsSale: ProductSale[]) => {
  const totalKg = itemsSale.reduce((acc, item) => acc + item.totalKg, 0);
  const totalPrice = itemsSale.reduce((acc, item) => acc + item.totalPrice, 0);

  return {
    totalKg: Intl.NumberFormat("id-ID", {
      style: "unit",
      unit: "kilogram",
    }).format(totalKg),
    totalPrice: Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(totalPrice),
  };
};

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userDb = await prisma.user.findUnique({
    where: { kindeId: user.id },
  });

  const jagungTerjual = await prisma.productSale.findMany({
    where: { userId: userDb?.id, productType: "JAGUNG" },
  });
  const berasTerjual = await prisma.productSale.findMany({
    where: { userId: userDb?.id, productType: "BERAS" },
  });

  const { totalKg: jagungTotalKg, totalPrice: jagungTotalPrice } = getTotalSale(jagungTerjual);
  const { totalKg: berasTotalKg, totalPrice: berasTotalPrice } = getTotalSale(berasTerjual);

  return (
    <div className="flex flex-col w-full items-center min-h-screen mt-4 max-w-7xl md:px-8 px-4 gap-4">
      <div className="w-full flex gap-2 md:gap-4 p-2 md:p-4 rounded-md bg-green-50 border border-green-200">
        <Image src={user.picture!} alt="logo" width={50} height={50} className="size-12" />
        <div className="grid md:grid-cols-2 grid-cols-1 justify-between w-full items-center gap-2">
          <div className="flex flex-col col-span-1 w-full">
            <h2 className="text-2xl font-bold text-green-800">
              {userDb?.firstName} {userDb?.lastName}
            </h2>
            <p className="text-green-800/70 font-medium">{userDb?.email}</p>
          </div>
          <div className="flex flex-col gap-2 col-span-1 w-full">
            <p className="flex text-green-800/70 font-medium gap-2">
              <Phone size={22} />
              <span>{userDb?.phone || "-"}</span>
            </p>
            <p className="flex text-green-800/70 font-medium gap-2">
              <MapPinHouse size={22} />
              <span>{userDb?.address || "-"}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid border-wrapper w-full text-green-900">
        <div className="grid md:grid-cols-2 grid-cols-1 w-full items-center justify-evenly gap-4">
          <div className="flex flex-col col-span-1 w-full items-center gap-2 px-2">
            <h3 className="text-lg font-semibold">Jagung</h3>
            <div className="flex items-center gap-2 w-full">
              <div className="relative size-36 w-full flex items-center justify-center bg-green-50 rounded-md border border-green-200">
                <p className="absolute top-0 text-sm font-medium text-green-900/80 whitespace-nowrap">
                  Total Pendapatan
                </p>
                <span className="font-semibold text-xl">{jagungTotalPrice}</span>
              </div>
              <div className="relative size-36 w-full flex items-center justify-center bg-green-50 rounded-md border border-green-200">
                <p className="absolute top-0 text-sm font-medium text-green-900/80 whitespace-nowrap">Total Berat</p>
                <span className="font-semibold text-xl">{jagungTotalKg}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col col-span-1 w-full items-center gap-2 px-2">
            <h3 className="text-lg font-semibold">Beras</h3>
            <div className="flex items-center gap-2 w-full">
              <div className="relative size-36 w-full flex items-center justify-center bg-green-50 rounded-md border border-green-200">
                <p className="absolute top-0 text-sm font-medium text-green-900/80 whitespace-nowrap">
                  Total Pendapatan
                </p>
                <span className="font-semibold text-xl">{berasTotalPrice}</span>
              </div>
              <div className="relative size-36 w-full flex items-center justify-center bg-green-50 rounded-md border border-green-200">
                <p className="absolute top-0 text-sm font-medium text-green-900/80 whitespace-nowrap">Total Berat</p>
                <span className="font-semibold text-xl">{berasTotalKg}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SaleHistory />
    </div>
  );
}
