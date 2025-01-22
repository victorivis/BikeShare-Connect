import { sequelize } from "../../database/sequelize.js";
import User from "../models/user.js"

/*async function getAllUsers() {
    return await User.findAll(); // Retorna todos os usuários
}*/

async function getAllUsers() {
    const usuarios = await sequelize.query(`
        SELECT * FROM usuario;
    `, { type: sequelize.QueryTypes.SELECT });
    return usuarios;
}


async function getUserById(id) {
    return await User.findByPk(id); // Busca um usuário pelo ID
}

async function getUserByCpfCnpj(cpfCnpj) {
    try {
        // Busca o usuário com base no campo 'cpf_cnpj'
        const user = await User.findOne({
            where: {
                cpf_cnpj: cpfCnpj, // Critério de busca
            },
        });

        return user; // Retorna o usuário encontrado ou null se não houver correspondência
    } catch (error) {
        console.error("Erro ao buscar usuário pelo CPF/CNPJ:", error);
        throw new Error("Erro ao buscar usuário. Tente novamente mais tarde.");
    }
}

async function getUserByEmail(email) {
    try {
        // Busca o usuário com base no campo 'email'
        const user = await User.findOne({
            where: {
                email: email, // Critério de busca
            },
        });

        return user; // Retorna o usuário encontrado ou null se não houver correspondência
    } catch (error) {
        console.error("Erro ao buscar usuário pelo EMAIL:", error);
        throw new Error("Erro ao buscar usuário. Tente novamente mais tarde.");
    }
}

async function createUser(data) {
    try {
        console.log("Data received for creation:", data); // Log para verificar entrada
        const newUser = await User.create(data); // Tenta criar o usuário
        return newUser; // Retorna o usuário criado
    } catch (error) {
        // Log detalhado no console para depuração
        if (error.errors) {
            console.error("Validation errors:");
            error.errors.forEach((err) => {
                console.error(`- Field: ${err.path}, Message: ${err.message}`);
            });
        } else {
            console.error("Database or other error:", error.message);
        }

        // Relança o erro com uma mensagem mais detalhada
        throw new Error(
            error.errors
                ? "Validation failed. Check required fields and constraints."
                : "Database error occurred. Please try again."
        );
    }
}


async function updateUser(id, data) {
    const user = await User.findByPk(id);  // Encontra o usuário pelo ID
    if (!user) return null; // Retorna null caso o usuário não seja encontrado

    try {
        // Atualiza os campos que foram passados no corpo da requisição
        const updatedUser = await user.update(data);
        return updatedUser;  // Retorna o usuário atualizado
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
    }
}


async function deleteUser(id) {
    const user = await User.findByPk(id); // Busca o usuário pelo ID
    if (!user) return false; // Retorna false se não encontrar
    await user.destroy(); // Remove o usuário
    return true;
}

export { getAllUsers, getUserById, getUserByCpfCnpj, getUserByEmail, createUser, updateUser, deleteUser };
