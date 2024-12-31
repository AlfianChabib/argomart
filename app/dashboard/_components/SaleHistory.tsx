import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SaleHistoryTable } from "./SaleHistoryTable";
import { columns } from "./sale-history-columns";

export default async function SaleHistory() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userDb = await prisma.user.findUnique({
    where: { kindeId: user.id },
    select: { id: true },
  });
  const productSales = await prisma.productSale.findMany({
    where: { userId: userDb?.id, status: "COMPLETED" },
  });

  return (
    <div className="flex flex-col w-full gap-2 p-2 border-wrapper text-green-900">
      <div className="flex justify-center items-center w-full">
        <h3 className="text-lg font-semibold">Riwayat Penjualan</h3>
      </div>
      <div className="flex flex-col w-full h-full min-h-72 gap-2">
        {productSales.length !== 0 ? (
          <SaleHistoryTable data={productSales} columns={columns} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full min-h-72">
            <p className="text-xl font-semibold text-green-900/50">Belum ada riwayat penjualan</p>
          </div>
        )}
      </div>
    </div>
  );
}
