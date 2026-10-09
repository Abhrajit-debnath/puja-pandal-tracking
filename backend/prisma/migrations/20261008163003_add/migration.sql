-- CreateTable
CREATE TABLE "BiswarjanQueue" (
    "id" TEXT NOT NULL,
    "pandalId" TEXT NOT NULL,
    "serialNo" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "startedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BiswarjanQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BiswarjanQueue_pandalId_key" ON "BiswarjanQueue"("pandalId");

-- CreateIndex
CREATE UNIQUE INDEX "BiswarjanQueue_serialNo_key" ON "BiswarjanQueue"("serialNo");

-- CreateIndex
CREATE INDEX "BiswarjanQueue_serialNo_idx" ON "BiswarjanQueue"("serialNo");

-- AddForeignKey
ALTER TABLE "BiswarjanQueue" ADD CONSTRAINT "BiswarjanQueue_pandalId_fkey" FOREIGN KEY ("pandalId") REFERENCES "Pandal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
