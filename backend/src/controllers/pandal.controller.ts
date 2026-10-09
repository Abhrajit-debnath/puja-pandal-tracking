import type { Request, Response, NextFunction } from "express";
import { createCheckinService, findNearbyPandals } from "../services/pandal.service.js";
import { checkinSchema, pandalIdSchema, type CheckinBody } from "../schemas/pandal.schema.js";
import type { CrowdLevelEnum, LocationCoordinates } from "../types/pandal.types.js";
import { getPandalById as getPandalByIdService } from "../services/pandal.service.js";
import { fetchCheckins } from "../repository/pandal.repository.js";
export const getNearbyPandals = async (
    req: Request<{}, any, any, LocationCoordinates>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { latitude, longitude } = req.query;


        if (!latitude || !longitude) {
            res.status(400).json({
                success: false,
                message: "Latitude and longitude are required.",
            });
            return;
        }

        const pandals = await findNearbyPandals({ latitude, longitude });


        res.status(200).json({
            success: true,
            message: "Nearby pandals fetched successfully.",
            data: pandals,
        });
    } catch (error) {
        next(error);
    }
};



export const getPandalById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const parsed = pandalIdSchema.safeParse(req.params);

        if (!parsed.success) {
            res.status(400).json({
                success: false,
                message: "Invalid pandal id.",
                errors: parsed.error.flatten(),
            });
            return;
        }

        const { id } = parsed.data;
        const pandal = await getPandalByIdService(id);

        if (!pandal) {
            res.status(404).json({
                success: false,
                message: "Pandal not found.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: pandal,
        });
    } catch (error) {
        next(error);
    }
};



export const createCheckin = async (
    req: Request<{ pandalId: string }, {}, CheckinBody>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const parsed = checkinSchema.safeParse(req.body);

        if (!parsed.success) {
            res.status(400).json({
                success: false,
                message: "Invalid Checkin data.",
                errors: parsed.error.flatten(),
            });
            return;
        }

        const { crowdLevel } = parsed.data;
        const { pandalId } = req.params;
        const checkIn = await createCheckinService(pandalId, crowdLevel as CrowdLevelEnum);

        if (!checkIn) {
            res.status(404).json({
                success: false,
                message: "Checkin not Created.",
            });
            return;
        }

        res.status(201).json({
            success: true,
            data: checkIn,
        });
    } catch (error) {
        next(error);
    }
};