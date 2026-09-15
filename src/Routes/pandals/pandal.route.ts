import Express, { Router } from "express";

import { locationSchema } from "../../schemas/pandal.schema.js";
import { validateQuery } from "../../middlewares/validation.middleware.js";
import { getNearbyPandals } from "../../controllers/pandal.controller.js";


const router : Router = Express.Router();



router.get('/nearby/location',validateQuery(locationSchema),getNearbyPandals)

export default router;