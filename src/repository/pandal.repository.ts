
import { PrismaClient } from "@prisma/client";
import type { LocationCoordinates } from "../types/pandal.types.js";

export const prisma = new PrismaClient();

export const findPandalsNear = async (coords: LocationCoordinates) => {

    const { latitude, longitude } = coords;

    const thresholdRadius = 1000
  return await prisma.$queryRaw`SELECT id, name, ST_Distance(location, ST_MakePoint(${longitude}, ${latitude})::geography) AS "distanceInMeters" FROM Pandals WHERE ST_DWithin(
    location,
    ST_MakePoint(${longitude}, ${latitude})::geography,
    ${thresholdRadius}
  ) ORDER BY "distanceInMeters" ASC;`}