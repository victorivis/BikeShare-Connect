import { Request, Response, NextFunction } from "express";

async function setUserParam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = req.params.id;
        req.body.ID_Usuario = id;
        next();

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default setUserParam;