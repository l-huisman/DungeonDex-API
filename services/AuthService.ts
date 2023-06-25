import jwt, { Secret } from 'jsonwebtoken';
import UserRequestDTO from "../dtos/UserRequestDTO";
import UserResponseDTO from "../dtos/UserResponseDTO";
import IUser from "../interfaces/IUser";
import UserRepository from "../repositories/UserRepository";
import { UserDTOException } from "../errors/UserDTOException";
import LoginRequestDTO from "../dtos/LoginRequestDTO";
import { UserNotFoundException } from "../errors/UserNotFoundException";
import { PasswordValidationException } from "../errors/PasswordValidationException";
import LoginResponseDTO from "../dtos/LoginResponseDTO";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export default class AuthService {
    private userReposiory: UserRepository;
    private jwtSecret: Secret;

    constructor() {
        this.userReposiory = new UserRepository();
        this.jwtSecret = process.env.JWT_SECRET || 'a_very_secret_key';
    }

    public async register(userRequest: UserRequestDTO): Promise<UserResponseDTO> {
        if (!userRequest.email || !userRequest.username || !userRequest.password) {
            throw new UserDTOException("Not all field have correctly been filled", 403);
        }
        // if (await this.userReposiory.getUserByEmail(userRequest.email)) {
        //     throw new UserCreationException("User with this email already exists", 403);
        // }
        // if (await this.userReposiory.getUserByUsername(userRequest.username)) {
        //     throw new UserCreationException("User with this username already exists", 403);
        // }
        userRequest.password = await this.hashPassword(userRequest.password);
        await this.userReposiory.createUser(userRequest);
        const user: IUser = await this.userReposiory.getUserByEmail(userRequest.email);
        return new UserResponseDTO(user.id, user.email, user.username);
    }

    public async login(credentials: LoginRequestDTO): Promise<LoginResponseDTO> {
        // Validate DTO
        if (!credentials.email || !credentials.password) {
            throw new UserDTOException("Not all field have correctly been filled", 403);
        }
        // Check if user exists
        const user: IUser = await this.userReposiory.getUserByEmail(credentials.email);
        if (!user) {
            throw new UserNotFoundException("User with this email does not exist", 404);
        }
        // Check if password is correct
        if (!await this.comparePassword(credentials.password, user.password)) {
            throw new PasswordValidationException("Password is incorrect", 400);
        }
        // Generate JWT
        const token = jwt.sign({ id: user.id }, this.jwtSecret, { expiresIn: "1h" });

        // Return JWT and user info
        return new LoginResponseDTO(user.id, user.email, user.username, token);
    }

    private hashPassword(password: string): any {
        const saltRounds = 16;
        return bcrypt.hash(password, saltRounds);
    }

    private comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
};