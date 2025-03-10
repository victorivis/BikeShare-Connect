import User from "../models/User";
import { InterfaceUser, redisUser } from "../models/User"; // Importando a InterfaceUser
import client from "../../database/redis";

async function loadAllUserCache(){
    try {
        let allUser: InterfaceUser[] | null = await User.find({});
        for(let i=0; i < allUser.length; i++){
            const id = allUser[i]._id;
            client.set(redisUser+id, JSON.stringify(allUser[i]));
        }
    } catch (error: any) {
        console.log("Erro ao preencher usuarios no cache")
    }
}

export default loadAllUserCache;