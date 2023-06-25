import IUser from "../interfaces/IUser";
import { BaseRepository } from "./BaseRepository";
import { UserNotFoundException } from "../errors/UserNotFoundException";
import { UserCreationException } from "../errors/UserCreationException";
import UserRequestDTO from "../dtos/UserRequestDTO";

export default class UserRepository extends BaseRepository {
    public async getUsers(): Promise<IUser[]> {
        try {
            const query = "SELECT * FROM `users`";
            const result = await this.executeQuery(query);
            if (result.length === 0) {
                throw new UserNotFoundException("Users not found in the database", 404);
            }
            return this.mapToModelArray(result);
        } catch (error) {
            throw new UserNotFoundException("Users not found in the database", 404, error as Error);
        }
    }

    public async getUserById(id: number): Promise<IUser> {
        try {
            const query = "SELECT * FROM `users` WHERE id = ?";
            const params = [id];
            const result = await this.executeQuery(query, params);
            return this.mapToUser(result[0]);
        } catch (error) {
            throw new UserNotFoundException(`User with id ${id} not found`, 404, error as Error);
        }
    }

    public async getUserByEmail(email: string): Promise<IUser> {
        try {
            const query = "SELECT * FROM `users` WHERE email = ?";
            const params = [email];
            const result = await this.executeQuery(query, params);
            return this.mapToUser(result[0]);
        } catch (error) {
            throw new UserNotFoundException(`User with email ${email} not found`, 404, error as Error);
        }
    }

    public async createUser(user: UserRequestDTO): Promise<IUser> {
        try {
            const query = "INSERT INTO `users` (`email`, `username`, `password`) VALUES (?, ?, ?);";
            const params = [user.email, user.username, user.password];
            const result = await this.executeQuery(query, params);
            const id = result[0].insertId;
            console.log(`Created user with id ${id}`);
            const createdUser = await this.getUserById(id);
            return createdUser;
        } catch (error) {
            console.log(error);
            throw new UserCreationException(`Error creating user with email ${user.email} and username ${user.username}`, 500, error as Error);
        }
    }

    private mapToUser(data: any): IUser {
        const user: IUser = {
            id: data.id,
            email: data.email,
            username: data.username,
            password: data.password
        };
        return user;
    }

    private mapToModelArray(result: any): IUser[] {
        const users: IUser[] = [];
        result.forEach((row: any) => {
            users.push(this.mapToUser(row));
        });
        return users;
    }
}