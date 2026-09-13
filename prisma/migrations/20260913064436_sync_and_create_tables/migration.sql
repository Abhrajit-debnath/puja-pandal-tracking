-- CreateEnum
CREATE TYPE "crowdStatus" AS ENUM ('LIGHT', 'MODERATE', 'HIGH');

-- CreateTable
CREATE TABLE "Pandal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "theme" TEXT,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "eventYear" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "bannerImageUrl" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pandal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checkins" (
    "id" TEXT NOT NULL,
    "crowdLevel" "crowdStatus" NOT NULL,
    "pandalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Checkins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Checkins" ADD CONSTRAINT "Checkins_pandalId_fkey" FOREIGN KEY ("pandalId") REFERENCES "Pandal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
