import { Router } from "express";
import createStationController from "../controller/createStationController";
import viewStationController from "../controller/viewStationController";
import deleteStationController from "../controller/deleteStationController";
import updateStationController from "../controller/updateStationController";
import findStationByIDController from "../controller/findStationByID";
import viewStationControllerSimplified from "../controller/viewStationControllerSimplified";

//middlewares
import isAdmin from "../middleware/isAdmin";

import multer from "multer";

const routesStation = Router();
const formData = multer();

routesStation.get("/station/simplified", viewStationControllerSimplified);

routesStation.get("/station", viewStationController);
routesStation.post("/station", isAdmin, formData.single("foto"), createStationController);
routesStation.delete("/station/:id", isAdmin, deleteStationController);
routesStation.put("/station/:id", isAdmin, formData.single("foto"), updateStationController);
routesStation.get("/station/:id", findStationByIDController);

export default routesStation;
