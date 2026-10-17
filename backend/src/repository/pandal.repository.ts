

import { prisma } from "../config/db.js";
import { logger } from "../config/logger.js";
import { getAverageCrowdLevel } from "../helpers/helpers.js";
import type { CrowdLevelEnum, LocationCoordinates, NearbyPandal } from "../types/pandal.types.js";


export const findPandalsNear = async (coords: LocationCoordinates): Promise<NearbyPandal[]> => {

    const { latitude, longitude } = coords;
    const thresholdRadius = 1000

    const pandals: { id: string; name: string; locality: string; theme: string; description: string; bannerImageUrl: string; ImageUrls: string[]; latitude: number; longitude: number; distanceInMeters: number }[] = await prisma.$queryRaw`SELECT id, name, locality, theme, description, "bannerImageUrl", "imageUrls" as "ImageUrls", latitude, longitude,  ST_Distance(ST_MakePoint(longitude, latitude)::geography, ST_MakePoint(${longitude}, ${latitude})::geography) AS "distanceInMeters" FROM "Pandal" WHERE ST_DWithin(ST_MakePoint(longitude, latitude)::geography, ST_MakePoint(${longitude}, ${latitude})::geography, ${thresholdRadius}) ORDER BY "distanceInMeters" ASC limit 1;`

    if (pandals.length === 0) {
        return [];
    }

    const pandalIds = pandals.map(pandal => pandal.id)
    const liveCrowdMap = await getAverageCrowdLevel(pandalIds)

    if (!liveCrowdMap) {
        return pandals.map(pandal => ({
            ...pandal,
            crowdLevelStatus: 'UNKNOWN' as unknown as NearbyPandal['crowdLevelStatus'],
            totalVotesInLast5Min: 0
        })) as NearbyPandal[]
    }
    return pandals.map(pandal => ({
        ...pandal,
        crowdLevelStatus: (liveCrowdMap[pandal.id]?.status || 'UNKNOWN') as unknown as NearbyPandal['crowdLevelStatus'],
        totalVotesInLast5Min: liveCrowdMap[pandal.id]?.total || 0,
    })) as NearbyPandal[]
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

export const fetchTopPandalsList = async (limit?: number) => {
    const topPandals = await prisma.topPandal.findMany({
        ...(limit ? { take: limit } : {}),
        include: {
            pandal: true


        },
        orderBy: {
            createdAt: 'asc'
        }
    })


    const pandalIds = topPandals.map(topPandal => topPandal.pandalId)

    const liveCrowdMap = await getAverageCrowdLevel(pandalIds)



    if (!liveCrowdMap) {
        return topPandals.map((topPandal) => ({
            ...topPandal,
            liveCrowd: 'UNKNOWN',
            liveVotes: 0
        }))
    }
    return topPandals.map((topPandal) => ({
        ...topPandal.pandal,
        liveCrowd: liveCrowdMap[topPandal.pandalId]?.status || 'UNKNOWN',
        liveVotes: liveCrowdMap[topPandal.pandalId]?.total || 0,
        topPandalId: topPandal.id,
    }))
};

