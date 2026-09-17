/*
  Warnings:

  - The values [LIGHT,MODERATE,HIGH] on the enum `crowdStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "crowdStatus_new" AS ENUM ('CALM', 'BUSY', 'PACKED');
ALTER TABLE "Checkins" ALTER COLUMN "crowdLevel" TYPE "crowdStatus_new" USING ("crowdLevel"::text::"crowdStatus_new");
ALTER TYPE "crowdStatus" RENAME TO "crowdStatus_old";
ALTER TYPE "crowdStatus_new" RENAME TO "crowdStatus";
DROP TYPE "public"."crowdStatus_old";
COMMIT;
