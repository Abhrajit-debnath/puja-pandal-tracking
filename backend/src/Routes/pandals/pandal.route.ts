import Express, { Router } from "express";
import { checkinSchema, locationSchema } from "../../schemas/pandal.schema.js";
import { validate, validateQuery } from "../../middlewares/validation.middleware.js";
import { createCheckin, getNearbyPandals, getPandalById } from "../../controllers/pandal.controller.js";
import { rateLimit } from "express-rate-limit";

const router: Router = Express.Router();

router.get('/nearby/location', validateQuery(locationSchema), getNearbyPandals);
router.get('/:id', getPandalById);
// router.get("/top/pandals", getNearbyPandals);
router.post("/:pandalId/checkins", rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes,
    limit: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: 'draft-8', // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    ipv6Subnet: 60
}), validate(checkinSchema), createCheckin);

export default router;