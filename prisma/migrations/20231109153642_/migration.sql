/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Footer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `JenisProduk` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Produk` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prdcd]` on the table `ProdukItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Footer_title_key" ON "Footer"("title");

-- CreateIndex
CREATE UNIQUE INDEX "JenisProduk_title_key" ON "JenisProduk"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Produk_title_key" ON "Produk"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ProdukItem_prdcd_key" ON "ProdukItem"("prdcd");
