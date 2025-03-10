import { Request, Response, NextFunction } from "express";

function isOwnUserOrAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    const ID_Usuario = req.params.id;

    if (!token) {
         res.status(401).json({ error: "Token ausente" });
         return
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do token

        if (payload.id!=ID_Usuario && payload.tipo === "Comum") {
             res.status(403).json({ error: "Você não têm acesso a esta funcionalidade para este id" });
             return
        }

        next();
    } catch (error) {
        console.error("Erro ao processar o token:", error);
         res.status(400).json({ error: "Token inválido" }); 
         return
    }
}

export default isOwnUserOrAdmin;
