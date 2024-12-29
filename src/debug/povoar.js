import { sequelize } from "../../database/sequelize.js"

const resposta = await sequelize.query(`
    INSERT INTO usuario (tipo, cpf_cnpj, nome, senha)
    VALUES
        ('Comum', '123', 'Carlos', '654123'),
        ('Administrador de Bicicletas', '321', 'João', '123'),
        ('Administrador Geral', '4444', 'Pedro', '123');
`);

//Isso nao eh obrigatorio, mas acelera uns 5s da requisicao
sequelize.close();