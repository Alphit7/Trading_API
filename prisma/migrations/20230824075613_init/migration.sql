/*
  Warnings:

  - Made the column `address` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `symbol` on table `Trade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `close_price` on table `Trade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `open_datetime` on table `Trade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `close_datetime` on table `Trade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "Trade" ALTER COLUMN "symbol" SET NOT NULL,
ALTER COLUMN "close_price" SET NOT NULL,
ALTER COLUMN "open_datetime" SET NOT NULL,
ALTER COLUMN "close_datetime" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;
