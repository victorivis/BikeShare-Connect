import { sequelize } from "../../database/sequelize.js";

const [resposta, metadadosBestas] = await sequelize.query("SELECT * FROM usuario");
console.log(resposta);

//Isso nao eh obrigatorio, mas acelera uns 5s da requisicao
sequelize.close();