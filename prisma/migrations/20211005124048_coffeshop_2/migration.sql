/*
  Warnings:

  - You are about to drop the column `categoryId` on the `CoffeeShop` table. All the data in the column will be lost.
  - Added the required column `coffeeShopId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoffeeShop" DROP CONSTRAINT "CoffeeShop_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "coffeeShopId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "categoryId";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
