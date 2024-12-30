/*
  Warnings:

  - You are about to drop the column `phone_id` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `country_of_origin` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `article_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `brand_id` on the `phones` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `phones` table. All the data in the column will be lost.
  - You are about to drop the column `release_date` on the `phones` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `internal_memory` on the `specifications` table. All the data in the column will be lost.
  - You are about to drop the column `phone_id` on the `specifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneId]` on the table `specifications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryOfOrigin` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `phones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internalMemory` to the `specifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_phone_id_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_article_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "phones" DROP CONSTRAINT "phones_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "specifications" DROP CONSTRAINT "specifications_phone_id_fkey";

-- DropIndex
DROP INDEX "profiles_user_id_key";

-- DropIndex
DROP INDEX "specifications_phone_id_key";

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "phone_id",
DROP COLUMN "user_id",
ADD COLUMN     "phoneId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "brands" DROP COLUMN "country_of_origin",
ADD COLUMN     "countryOfOrigin" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "article_id",
DROP COLUMN "user_id",
ADD COLUMN     "articleId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "phones" DROP COLUMN "brand_id",
DROP COLUMN "image_url",
DROP COLUMN "release_date",
ADD COLUMN     "brandId" INTEGER,
ADD COLUMN     "imageUrl" VARCHAR(255) NOT NULL,
ADD COLUMN     "releaseDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "specifications" DROP COLUMN "internal_memory",
DROP COLUMN "phone_id",
ADD COLUMN     "internalMemory" INTEGER NOT NULL,
ADD COLUMN     "phoneId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "specifications_phoneId_key" ON "specifications"("phoneId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "phones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specifications" ADD CONSTRAINT "specifications_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "phones"("id") ON DELETE SET NULL ON UPDATE CASCADE;
