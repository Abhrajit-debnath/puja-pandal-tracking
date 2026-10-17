-- CreateTable
CREATE TABLE "TopPandal" (
    "id" TEXT NOT NULL,
    "pandalId" TEXT NOT NULL,
    "crowdLevel" "crowdStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopPandal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TopPandal_pandalId_key" ON "TopPandal"("pandalId");

-- AddForeignKey
ALTER TABLE "TopPandal" ADD CONSTRAINT "TopPandal_pandalId_fkey" FOREIGN KEY ("pandalId") REFERENCES "Pandal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
