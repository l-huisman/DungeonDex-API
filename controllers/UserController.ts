import { Request, Response } from "express";
import UserService from "../services/UserService";
import UserResponseDTO from "../dtos/UserResponseDTO";
import APIResponseDTO from "../dtos/APIResponseDTO";
import { UserNotFoundException } from "../errors/UserNotFoundException";

export default class UserController {
    public async getUsers(req: Request, res: Response): Promise<void> {
        const userService = new UserService();
        let users: any[];
        try {
            users = await userService.getAll();
            const response = new APIResponseDTO<UserResponseDTO[]>("Success", users, undefined);
            res.status(200).json(response);
        } catch (error) {
            let message: string = "Something went wrong, please try again later or contact administrator.";
            let statusCode: number = 500;
            if (error instanceof UserNotFoundException) {
                message = error.message;
                statusCode = error.statusCode;
            }
            const response = new APIResponseDTO<any>(message, undefined, error);
            res.status(statusCode).json(response);
        }
    }
}