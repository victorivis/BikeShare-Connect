import { Request, Response, NextFunction} from 'express';


function validateCpfCnpj (req: Request, res: Response, next: NextFunction){
    let cpfCnpj = req.body.cpf_cnpj;
    let tipo = req.body.tipo;

    const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;



    if (cpfRegex.test(cpfCnpj)) {
        if (tipo !== "Comum") {
             res.status(403).json({ error: "Administradores não podem logar com CPF" });
             return
        }
        req.body.cpf_cnpj = cpfCnpj.replace(/\D/g, '');
        next();
    } else if (cnpjRegex.test(cpfCnpj)) {
        if (tipo === "Comum") {
             res.status(403).json({ error: "Usuários Comuns não podem logar com CNPJ" });
             return
        }
        req.body.cpf_cnpj = cpfCnpj.replace(/\D/g, '');
        next();
    } else {
         res.status(400).json({ error: "Formato inválido de CPF/CNPJ" });
         return
    }
}

export default validateCpfCnpj;