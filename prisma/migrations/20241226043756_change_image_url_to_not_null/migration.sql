/*
  Warnings:

  - Made the column `imageUrl` on table `articles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "imageUrl" SET NOT NULL;
