import { Router } from "express";
import createStationController from "../controller/createStationController.js";
import viewStationController from "../controller/viewStationController.js";
import deleteStationController from "../controller/deleteStationController.js";
import updateStationController from "../controller/updateStationController.js";

const routesStation = Router();

routesStation.get("/estacao", viewStationController);
routesStation.post("/estacao", createStationController);
routesStation.delete("/estacao/:id", deleteStationController);
routesStation.put("/estacao/:id", updateStationController);

export default routesStation;