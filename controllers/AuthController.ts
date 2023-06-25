import APIResponseDTO from "../dtos/APIResponseDTO";
import LoginResponseDTO from "../dtos/LoginResponseDTO";
import UserResponseDTO from "../dtos/UserResponseDTO";
import { PasswordValidationException } from "../errors/PasswordValidationException";
import { UserCreationException } from "../errors/UserCreationException";
import { UserDTOException } from "../errors/UserDTOException";
import { UserNotFoundException } from "../errors/UserNotFoundException";
import IUser from "../interfaces/IUser";
import AuthService from "../services/AuthService";
import { Request, Response } from "express";

export default class AuthController {
    public async login(req: Request, res: Response): Promise<void> {
        const authService = new AuthService();
        try {
            const user = await authService.login(req.body);
            const response = new APIResponseDTO<LoginResponseDTO>("Success", user, undefined);
            res.status(200).json(response);
        } catch (error) {
            let message: string = "Something went wrong, please try again later or contact administrator.";
            let statusCode: number = 500;
            if (error instanceof UserNotFoundException || error instanceof UserDTOException || error instanceof PasswordValidationException) {
                message = error.message;
                statusCode = error.statusCode;
            }
            const response = new APIResponseDTO<any>(message, undefined, error);
            res.status(statusCode).json(response);
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        const authService = new AuthService();
        try {
            const user = await authService.register(req.body);
            const response = new APIResponseDTO<UserResponseDTO>("Success", user, undefined);
            res.status(201).json(response);
        } catch (error) {
            let message: string = "Something went wrong, please try again later or contact administrator.";
            let statusCode: number = 500;
            if (error instanceof UserCreationException || error instanceof UserDTOException || error instanceof UserNotFoundException) {
                message = error.message;
                statusCode = error.statusCode;
            }
            const response = new APIResponseDTO<any>(message, undefined, error);
            res.status(statusCode).json(response);
        }
    }
}