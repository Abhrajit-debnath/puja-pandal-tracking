

import { prisma } from "../config/db.js";
import type { CrowdLevelEnum, LocationCoordinates } from "../types/pandal.types.js";


export const findPandalsNear = async (coords: LocationCoordinates) => {

  const { latitude, longitude } = coords;

  const thresholdRadius = 1000
  return await prisma.$queryRaw`SELECT id, name, ST_Distance(ST_MakePoint(longitude, latitude)::geography, ST_MakePoint(${longitude}, ${latitude})::geography) AS "distanceInMeters" FROM "Pandal" WHERE ST_DWithin(
    ST_MakePoint(longitude, latitude)::geography,
    ST_MakePoint(${longitude}, ${latitude})::geography,
    ${thresholdRadius}
  ) ORDER BY "distanceInMeters" ASC;`}




export const findPandalById = async (id: string) => {
    return await prisma.pandal.findUnique({
        where: { id },
    });
};




export const createCheckin = async (pandalId:string,crowdLevel: CrowdLevelEnum) => {
    return await prisma.checkins.create({
        data: {
            pandalId,
            crowdLevel
        }
    });
};