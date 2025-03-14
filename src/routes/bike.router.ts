import { Router, Request, Response } from "express";
import createBikeController from "../controller/createBikeController";
import viewBikeController from "../controller/viewBikeController";
import deleteBikeController from "../controller/deleteBikeController";
import updateBikeController from "../controller/updateBikeController";
import viewBikeControllerSimplified from "../controller/viewBikeControllerSimplified";
import setBikeUnavailableController from "../controller/setBikeUnavailableController";
import setBikeAvailableController from "../controller/setBikeAvailableController";

//middlewares
import setBikeBody from "../middleware/setBikeBody";
import isStationIDValid from "../middleware/isStationIDValid";
import isUserIDValid from "../middleware/isUserIDValid";
import isAdmin from "../middleware/isAdmin";

const routesBike: Router = Router();

import multer from "multer";
const formData = multer();

routesBike.get("/bike/simplified", viewBikeControllerSimplified);

routesBike.get("/bike", viewBikeController);
routesBike.post("/bike", isAdmin, formData.single("foto"), setBikeBody, isUserIDValid, isStationIDValid, createBikeController);
routesBike.delete("/bike/:id", isAdmin, deleteBikeController);
routesBike.patch("/bike/:id", isAdmin, formData.single("foto"), updateBikeController);

routesBike.patch("/bike/:id/unavailable", isAdmin, setBikeUnavailableController);
routesBike.patch("/bike/:id/available", isAdmin, setBikeAvailableController);

export default routesBike;