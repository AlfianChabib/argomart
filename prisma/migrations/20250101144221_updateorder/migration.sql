/*
  Warnings:

  - You are about to drop the column `orderId` on the `products` table. All the data in the column will be lost.
  - Added the required column `count` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "count" INTEGER NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "orderId";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
