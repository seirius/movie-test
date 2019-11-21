import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "http-status-codes";

export async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(UNAUTHORIZED).send();
}