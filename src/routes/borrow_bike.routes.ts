import { Router } from "express";

import countBorrowBikeByBikeIDController from "../controller/countBorrowBikeByBikeIDController";
import createBorrowBikeController from "../controller/createBorrowBikeController";

//Middleware
import isBikeIDValid from "../middleware/isBikeIDValid";
import isUserIDValid from "../middleware/isUserIDValid";
import isStationIDValid from "../middleware/isStationIDValid";
import setBikeParam from "../middleware/setBikeParam";
import countBorrowBikeByUserIDController from "../controller/countBorrowBikeByUserIDController";
import validateBorrowBike from "../middleware/validateBorrowBike";
import setUserParam from "../middleware/setUserParam";

const routesBorrowBike: Router = Router();

routesBorrowBike.get("/borrow_bike/count_bike/:id", setBikeParam, isBikeIDValid, countBorrowBikeByBikeIDController);
routesBorrowBike.get("/borrow_bike/count_user/:id", setUserParam, isUserIDValid, countBorrowBikeByUserIDController);
routesBorrowBike.post("/borrow_bike", isBikeIDValid, isUserIDValid, validateBorrowBike, createBorrowBikeController);

export default routesBorrowBike;