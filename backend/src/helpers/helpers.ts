import { prisma } from "../config/db.js";
import type { CrowdLevelEnum } from "../types/pandal.types.js";

export const getAverageCrowdLevel = async (pandalIds: string[]) => {

    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);

    const recentCheckins = await prisma.checkins.findMany({
        where: {
            pandalId: { in: pandalIds },
            createdAt: { gte: fiveMinAgo }
        },
        select: {
            pandal: true,
            pandalId: true,
            crowdLevel: true
        }
    })

    const crowdMap: Record<string, { CALM: number, BUSY: number, PACKED: number }> = {};

    for (const checkin of recentCheckins) {
        if (!crowdMap[checkin.pandalId]) {
            crowdMap[checkin.pandalId] = { CALM: 0, BUSY: 0, PACKED: 0 };
        }

        crowdMap[checkin.pandalId]![checkin.crowdLevel] += 1;

    }

    const resultMap: Record<string, { status: CrowdLevelEnum | 'UNKNOWN', total: number }> = {};

    for (const id of pandalIds) {
        const counts = crowdMap[id]

        if (!counts || (counts.CALM + counts.BUSY + counts.PACKED === 0)) {
            resultMap[id] = { status: 'UNKNOWN', total: 0 };
            continue;
        }

        let status: CrowdLevelEnum = 'CALM' as CrowdLevelEnum;


        if (counts.PACKED >= counts.BUSY&& counts.PACKED >= counts.CALM) status = 'PACKED' as CrowdLevelEnum;
        else if (counts.BUSY >= counts.CALM) status = 'BUSY' as CrowdLevelEnum;

        resultMap[id]= {status,total: counts[status]}


    }


        return resultMap;
}