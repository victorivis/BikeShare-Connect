import { Router } from "express";
import routesStation from "./station.router.js";
import routesUser from "./user.router.js"
import routesBike from "./bike.router.js";

const routes = Router();

routes.use(routesStation);
routes.use(routesUser);
routes.use(routesBike);

export default routes;