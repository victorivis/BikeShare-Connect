import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function autenticar(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, "seuSegredoSuperSecreto");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido ou expirado" });
    }
}

// Middleware para verificar se o usuário é Comum
export function verificarComum(req, res, next) {
    if (req.user.tipo !== "Comum") {
        return res.status(403).json({ error: "Acesso negado. Apenas usuários Comuns podem acessar esta rota." });
    }
    next();
}

// Middleware para verificar se o usuário é Administrador de Bicicletas
export function verificarAdministradorBicicletas(req, res, next) {
    if (req.user.tipo !== "Administrador de Bicicletas") {
        return res.status(403).json({ error: "Acesso negado. Apenas Administradores de Bicicletas podem acessar esta rota." });
    }
    next();
}

// Middleware para verificar se o usuário é Administrador Geral
export function verificarAdministradorGeral(req, res, next) {
    if (req.user.tipo !== "Administrador Geral") {
        return res.status(403).json({ error: "Acesso negado. Apenas Administradores Gerais podem acessar esta rota." });
    }
    next();
}
