-- DropForeignKey
ALTER TABLE "Produk" DROP CONSTRAINT "Produk_jenisProdukId_fkey";

-- DropForeignKey
ALTER TABLE "ProdukDesc" DROP CONSTRAINT "ProdukDesc_produkitemId_fkey";

-- DropForeignKey
ALTER TABLE "ProdukItem" DROP CONSTRAINT "ProdukItem_produkId_fkey";

-- AddForeignKey
ALTER TABLE "Produk" ADD CONSTRAINT "Produk_jenisProdukId_fkey" FOREIGN KEY ("jenisProdukId") REFERENCES "JenisProduk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdukItem" ADD CONSTRAINT "ProdukItem_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdukDesc" ADD CONSTRAINT "ProdukDesc_produkitemId_fkey" FOREIGN KEY ("produkitemId") REFERENCES "ProdukItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
