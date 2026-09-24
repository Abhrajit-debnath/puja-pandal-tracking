import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod"; 

export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues
            });
        }

        req.body = result.data;
        next();
    };
};

export const validateQuery = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.query);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues
            });
        }

        Object.assign(req.query, result.data);
        next();
    };
};