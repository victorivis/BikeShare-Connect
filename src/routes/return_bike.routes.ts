import { Router } from "express";

import countReturnBikeByBikeIDController from "../controller/countReturnBikeByBikeIDController";
import createReturnBikeController from "../controller/createReturnBikeController";

//middlewares
import isBikeIDValid from "../middleware/isBikeIDValid";
import isUserIDValid from "../middleware/isUserIDValid";
import isStationIDValid from "../middleware/isStationIDValid";
import setBikeParam from "../middleware/setBikeParam";
import countReturnBikeByUserIDController from "../controller/countReturnBikeByUserIDController";
import validateReturnBike from "../middleware/validateReturnBike";
import setUserParam from "../middleware/setUserParam";
import isAdmin from "../middleware/isAdmin";

const routesReturnBike: Router = Router();

routesReturnBike.get("/return_bike/count_bike/:id", setBikeParam, isBikeIDValid, countReturnBikeByBikeIDController);
routesReturnBike.get("/return_bike/count_user/:id", setUserParam, isUserIDValid, countReturnBikeByUserIDController);
routesReturnBike.post("/return_bike", isAdmin, isBikeIDValid, isStationIDValid, validateReturnBike, createReturnBikeController);

export default routesReturnBike;