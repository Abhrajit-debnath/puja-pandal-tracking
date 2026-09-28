import Express, { Router } from "express";
import { checkinSchema, locationSchema } from "../../schemas/pandal.schema.js";
import { validate, validateQuery } from "../../middlewares/validation.middleware.js";
import { createCheckin, getNearbyPandals, getPandalById } from "../../controllers/pandal.controller.js";

const router: Router = Express.Router();

router.get('/nearby/location', validateQuery(locationSchema), getNearbyPandals);
router.get('/:id', getPandalById);
router.post("/:pandalId/checkins", validate(checkinSchema), createCheckin);

export default router;