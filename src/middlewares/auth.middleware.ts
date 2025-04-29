import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { jwtConfig } from "../config/jwt";


export interface AuthRequest extends Request {
    user?: { id: number; role: string }
}

export function ensureAuth(req: AuthRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: 'Token não fornecido' });
        return;
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, jwtConfig.secret) as { id: number; role: string };
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: 'Token inválido' });
    }
}


export function ensureRole(requireRole: string) {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
      if (req.user?.role !== requireRole) {
        res.status(403).json({ error: 'Acesso negado' });
        return;
      }
      next();
    };
  }


