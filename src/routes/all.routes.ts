import { Router } from "express";
import routesStation from "./station.router";
import routesUser from "./user.router"
import routesBike from "./bike.router";
import routesBorrowBike from "./borrow_bike.routes";

const routes: Router = Router();

routes.use(routesStation);
routes.use(routesUser);
routes.use(routesBike);
routes.use(routesBorrowBike);

export default routes;