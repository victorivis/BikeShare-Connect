import client from "../../database/redis.js";

await client.set("tres", JSON.stringify({um: 1, dos: 2, treees: 3}));
const resposta = await client.get("tres");
console.log(resposta);