import { Request, Response, NextFunction } from "express";

async function setBikeBody(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { telefone } = req.body;
        
        const telefoneComposto: RegExp = /^(?:\(\d{2}\)\s?|\d{2}\s)\d{5}-\d{4}$/;
        const telefoneSimples: RegExp = /^\d{9}$/;

        if(telefoneComposto.test(telefone) || telefoneSimples.test(telefone)){
            req.body.telefone = telefone.replace(/\D/g, ''); //Retira tudo que nao eh digito
            next();
        }
        else{
            res.status(400).json({error: "Telefone não possui uma formatação válida. Devem ser 9 dígitos ao todo."});
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default setBikeBody;