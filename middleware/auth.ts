import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import APIResponseDTO from '../dtos/APIResponseDTO';

export const SECRET_KEY: Secret = process.env.JWT_SECRET || 'your-default-secret-key';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        const response = new APIResponseDTO<any>("Please authenticate!", undefined, err);
        res.status(401).json(response);
    }
};