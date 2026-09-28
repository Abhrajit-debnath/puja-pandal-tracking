

import { prisma } from "../config/db.js";
import { logger } from "../config/logger.js";
import type { CrowdLevelEnum, LocationCoordinates } from "../types/pandal.types.js";


export const findPandalsNear = async (coords: LocationCoordinates) => {

    const { latitude, longitude } = coords;

    const thresholdRadius = 1000

    const pandals: { id: string; name: string; locality: string; theme: string; description: string; bannerImageUrl: string; ImageUrls: string[]; latitude: number; longitude: number; distanceInMeters: number }[] = await prisma.$queryRaw`SELECT id, name, locality, theme, description, latitude, longitude,  ST_Distance(ST_MakePoint(longitude, latitude)::geography, ST_MakePoint(${longitude}, ${latitude})::geography) AS "distanceInMeters" FROM "Pandal" WHERE ST_DWithin(
    ST_MakePoint(longitude, latitude)::geography,
    ST_MakePoint(${longitude}, ${latitude})::geography,
    ${thresholdRadius}
  ) ORDER BY "distanceInMeters" ASC limit 1;`



    if (pandals.length === 0) {
        return [];

    }


    const durationThresshold = new Date(Date.now() - 5 * 60 * 1000)

    const pandalIds = pandals.map(pandal => pandal.id)


    const recentCheckins = await prisma.checkins.findMany({
        where: {
            pandalId: { in: pandalIds },
            createdAt: { gte: durationThresshold }
        },
        select: {
            pandalId: true,
            crowdLevel: true,

        }
    })





    const crowdLevelMap: Record<string, Record<CrowdLevelEnum, number>> = {}


    for (const checkin of recentCheckins) {
        if (!crowdLevelMap[checkin.pandalId]) {
            crowdLevelMap[checkin.pandalId] = {
                CALM: 0,
                BUSY: 0,
                PACKED: 0
            }
        } else {
            const pMap = crowdLevelMap[checkin.pandalId]

            pMap![checkin.crowdLevel] += 1
        }

    }
    return pandals.map(pandal=>{
        const counts  = crowdLevelMap[pandal.id] || { CALM: 0, BUSY: 0, PACKED: 0 }

        let status = "CALM"
        let maxVotes = 0

       for (const [level,count] of Object.entries(counts)) {

        if (count > maxVotes) {
            maxVotes = count
            status = level
        }
        
       }
       return {
        id: pandal.id,
        name: pandal.name,
        locality: pandal.locality,
        theme: pandal.theme,
        description: pandal.description,
        latitude: pandal.latitude,
        longitude: pandal.longitude,
        distanceInMeters: pandal.distanceInMeters,
        crowdLevelStatus: status,
        totalVotesInLast5Min: maxVotes

       }
                     

 
     })
        

};



export const findPandalById = async (id: string) => {
    return await prisma.pandal.findUnique({
        where: { id },
    });
};




export const createCheckin = async (pandalId: string, crowdLevel: CrowdLevelEnum) => {
    return await prisma.checkins.create({
        data: {
            pandalId,
            crowdLevel
        }
    });
};

export const fetchCheckins = async (pandalId: string) => {
    return await prisma.checkins.findMany({
        where: {
            pandalId
        }
    });
};  
