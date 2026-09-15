-- CreateIndex
CREATE INDEX "Checkins_pandalId_createdAt_id_idx" ON "Checkins"("pandalId", "createdAt", "id");

-- CreateIndex
CREATE INDEX "Pandal_latitude_longitude_id_idx" ON "Pandal"("latitude", "longitude", "id");

