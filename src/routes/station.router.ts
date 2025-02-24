import { Router } from "express";
import createStationController from "../controller/createStationController";
import viewStationController from "../controller/viewStationController";
import deleteStationController from "../controller/deleteStationController";
import updateStationController from "../controller/updateStationController";
import findStationByIDController from "../controller/findStationByID";
import multer from "multer";

const routesStation = Router();
const formData = multer();

routesStation.get("/station", viewStationController);
routesStation.post("/station", formData.single("foto"), createStationController);
routesStation.delete("/station/:id", deleteStationController);
routesStation.put("/station/:id", formData.single("foto"), updateStationController);
routesStation.get("/station/:id", findStationByIDController);

export default routesStation;
