import Express, { Router } from "express";
import pandalRoutes from "./pandals/pandal.route.js";


const router:Router = Express.Router();


router.use('/api/v1/pandals',pandalRoutes)


export default router;