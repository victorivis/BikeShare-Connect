import client from "../../database/redis";
import { redisUser } from "../models/User";

async function findUserByID(ID_Usuario:string) {
    let cacheUser: string | null = await client.get(redisUser+ID_Usuario);
    return cacheUser;
}

export default findUserByID;