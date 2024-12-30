-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "imageUrl" VARCHAR(255),
ADD COLUMN     "popularModels" VARCHAR(255),
ADD COLUMN     "yearFounded" INTEGER;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "imageUrl" VARCHAR(255);
