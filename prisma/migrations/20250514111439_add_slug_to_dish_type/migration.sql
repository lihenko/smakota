/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `DishType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `DishType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable

ALTER TABLE "DishType" ADD COLUMN "slug" TEXT NOT NULL DEFAULT 'temp-slug';


-- CreateIndex
CREATE UNIQUE INDEX "DishType_slug_key" ON "DishType"("slug");
