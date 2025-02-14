import { Router } from "express";
import createStationController from "../controller/createStationController.js";
import viewStationController from "../controller/viewStationController.js";
import deleteStationController from "../controller/deleteStationController.js";
import updateStationController from "../controller/updateStationController.js";

const routesStation = Router();

import multer from "multer";
const formData = multer();

routesStation.get("/station", viewStationController);
routesStation.post("/station", formData.single("foto"), createStationController);
routesStation.delete("/station/:id", deleteStationController);
routesStation.put("/station/:id", formData.single("foto"), updateStationController);

export default routesStation;