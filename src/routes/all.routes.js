import { Router } from "express";
import routesStation from "./station.router.js";

const routes = Router();

routes.use(routesStation);

export default routes;