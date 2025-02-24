import { Router, Request, Response } from "express";
import createBikeController from "../controller/createBikeController";
import viewBikeController from "../controller/viewBikeController";
import deleteBikeController from "../controller/deleteBikeController";
import updateBikeController from "../controller/updateBikeController";

const routesBike: Router = Router();

import multer from "multer";
const formData = multer();

routesBike.get("/bike", viewBikeController);
routesBike.post("/bike", formData.single("foto"), createBikeController);
routesBike.delete("/bike/:id", deleteBikeController);
routesBike.put("/bike/:id", formData.single("foto"), updateBikeController);

export default routesBike;