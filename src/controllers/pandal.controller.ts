import type { Request, Response, NextFunction } from "express";
import { findNearbyPandals } from "../services/pandal.service.js";
import type { LocationQueryParams } from "../schemas/pandal.schema.js";
import type { LocationCoordinates } from "../types/pandal.types.js";

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
            data: pandals,
        });
    } catch (error) {
        next(error);
    }
};