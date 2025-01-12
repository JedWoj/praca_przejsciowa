/*
  Warnings:

  - You are about to drop the column `description` on the `Part` table. All the data in the column will be lost.
  - You are about to drop the column `timeToBeDelivered` on the `Part` table. All the data in the column will be lost.
  - You are about to drop the column `timeToBeProduced` on the `Part` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,operationId,sequence]` on the table `ProductOperation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'ORDERED';

-- DropIndex
DROP INDEX "ProductOperation_productId_operationId_key";

-- AlterTable
ALTER TABLE "Part" DROP COLUMN "description",
DROP COLUMN "timeToBeDelivered",
DROP COLUMN "timeToBeProduced";

-- CreateIndex
CREATE UNIQUE INDEX "ProductOperation_productId_operationId_sequence_key" ON "ProductOperation"("productId", "operationId", "sequence");
