-- CreateTable
CREATE TABLE "Footer" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JenisProduk" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "JenisProduk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produk" (
    "id" SERIAL NOT NULL,
    "jenisProdukId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdukItem" (
    "id" SERIAL NOT NULL,
    "produkId" INTEGER NOT NULL,
    "prdcd" TEXT NOT NULL,
    "prd_name" TEXT NOT NULL,
    "prd_category" TEXT NOT NULL,
    "prd_type" TEXT NOT NULL,
    "prd_bestseller" BOOLEAN NOT NULL,
    "prd_asset" TEXT[],
    "prd_thumbnail" TEXT[],

    CONSTRAINT "ProdukItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdukDesc" (
    "id" SERIAL NOT NULL,
    "produkitemId" INTEGER NOT NULL,
    "size1" TEXT[],
    "size2" TEXT[],
    "key_type" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "superiority" TEXT[],
    "usecase" TEXT[],
    "note" TEXT NOT NULL,
    "type" TEXT[],

    CONSTRAINT "ProdukDesc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Footer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produk" ADD CONSTRAINT "Produk_jenisProdukId_fkey" FOREIGN KEY ("jenisProdukId") REFERENCES "JenisProduk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdukItem" ADD CONSTRAINT "ProdukItem_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdukDesc" ADD CONSTRAINT "ProdukDesc_produkitemId_fkey" FOREIGN KEY ("produkitemId") REFERENCES "ProdukItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
