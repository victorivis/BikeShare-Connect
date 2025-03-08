import { Router } from "express";

import countBorrowBikeByBikeIDController from "../controller/countBorrowBikeByBikeIDController";
import createBorrowBikeController from "../controller/createBorrowBikeController";

//Middleware
import isBikeIDValid from "../middleware/isBikeIDValid";
import isUserIDValid from "../middleware/isUserIDValid";
import isStationIDValid from "../middleware/isStationIDValid";
import setBikeParam from "../middleware/setBikeParam";

const routesBorrowBike: Router = Router();

import multer from "multer";
const formData = multer();

routesBorrowBike.get("/borrow_bike/count_bike/:id", setBikeParam, isBikeIDValid, countBorrowBikeByBikeIDController);
routesBorrowBike.post("/borrow_bike", isBikeIDValid, isStationIDValid, isUserIDValid, createBorrowBikeController);

export default routesBorrowBike;