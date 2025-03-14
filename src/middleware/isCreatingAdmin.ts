import { Request, Response, NextFunction } from "express";

function isCreatingAdmin(req: Request, res: Response, next: NextFunction) {
    if(req.body.tipo!="Comum"){
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({ error: "Token ausente" });
            return
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do token

            if (payload.tipo === "Comum") {
                res.status(403).json({ error: "Usuários Comuns não têm acesso a esta funcionalidade" });
                return
            }

            next();
        } catch (error) {
            console.error("Erro ao processar o token:", error);
            res.status(400).json({ error: "Token inválido" }); 
            return
        }
    }
    else{
        next();
    }
}

export default isCreatingAdmin;
