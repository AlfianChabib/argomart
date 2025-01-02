import prisma from "@/lib/prisma";
import Image from "next/image";
import Buy from "./_components/Buy";

export default async function Page() {
  const products = await prisma.product.findMany();

  return (
    <div className="flex flex-col w-full items-center min-h-screen mt-4 max-w-7xl md:px-8 px-4 gap-4">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-2xl font-bold text-green-800">Produk List</h1>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full mt-8 mb-4">
        {products.map((item) => (
          <div
            key={item.name}
            className="flex col-span-1 flex-col items-center gap-2 w-full rounded-md border border-green-200 overflow-hidden"
          >
            <div className="w-full aspect-[1/1] overflow-hidden rounded-md">
              <Image src={item.image!} width={200} height={200} alt={item.name} className="size-full object-cover" />
            </div>
            <div className="p-2 gap-2 flex flex-col">
              <h2 className="text-lg font-semibold text-green-800">{item.name}</h2>
              <p className="text-sm text-green-800/70 font-medium">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(item.price)}
              </p>
              <p className="text-sm text-green-800/70 font-medium">{item.description}</p>
              <Buy productId={item.id} productName={item.name} price={item.price} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
