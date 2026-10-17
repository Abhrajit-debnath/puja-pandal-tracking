-- DropForeignKey
ALTER TABLE "BiswarjanQueue" DROP CONSTRAINT "BiswarjanQueue_pandalId_fkey";

-- DropForeignKey
ALTER TABLE "Checkins" DROP CONSTRAINT "Checkins_pandalId_fkey";

-- DropForeignKey
ALTER TABLE "TopPandal" DROP CONSTRAINT "TopPandal_pandalId_fkey";

-- AddForeignKey
ALTER TABLE "TopPandal" ADD CONSTRAINT "TopPandal_pandalId_fkey" FOREIGN KEY ("pandalId") REFERENCES "Pandal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkins" ADD CONSTRAINT "Checkins_pandalId_fkey" FOREIGN KEY ("pandalId") REFERENCES "Pandal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BiswarjanQueue" ADD CONSTRAINT "BiswarjanQueue_pandalId_fkey" FOREIGN KEY ("pandalId") REFERENCES "Pandal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
