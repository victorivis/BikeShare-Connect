import { Router } from "express";
import createBikeController from "../controller/createBikeController.js";
import viewBikeController from "../controller/viewBikeController.js";
import deleteBikeController from "../controller/deleteBikeController.js";
import updateBikeController from "../controller/updateBikeController.js";

const routesBike = Router();

import multer from "multer";
const formData = multer();

routesBike.get("/bike", viewBikeController);
routesBike.post("/bike", formData.single("foto"), createBikeController);
routesBike.delete("/bike/:id", deleteBikeController);
routesBike.put("/bike/:id", formData.single("foto"), updateBikeController);

export default routesBike;