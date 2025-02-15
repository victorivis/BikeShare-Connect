import { Router } from "express";
import routesStation from "./station.router.js";
import routesUser from "./user.router.js"

const routes = Router();

routes.use(routesStation);
routes.use(routesUser);

export default routes;