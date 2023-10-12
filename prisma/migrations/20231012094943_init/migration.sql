-- CreateTable
CREATE TABLE "Products" (
    "id" SMALLSERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "productPrice" REAL NOT NULL,
    "productDescription" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
