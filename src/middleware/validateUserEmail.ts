import { Request, Response, NextFunction } from "express";

async function validateUserEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email } = req.body;
        
        const regexEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if(email==undefined || regexEmail.test(email)){
            next();
        }
        else{
            res.status(400).json({error: "Telefone não possui uma formatação válida. Devem ser 9 dígitos ao todo."});
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default validateUserEmail;