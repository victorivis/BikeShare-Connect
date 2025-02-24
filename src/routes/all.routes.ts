import { Router } from "express";
import routesStation from "./station.router";
import routesUser from "./user.router"
import routesBike from "./bike.router";

const routes: Router = Router();

routes.use(routesStation);
routes.use(routesUser);
routes.use(routesBike);

export default routes;