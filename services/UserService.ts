import UserRepository from "../repositories/UserRepository";
import { UserDTOException } from "../errors/UserDTOException";
import { UserCreationException } from "../errors/UserCreationException";
import { UserNotFoundException } from "../errors/UserNotFoundException";
import IUser from "../interfaces/IUser";
import UserResponseDTO from "../dtos/UserResponseDTO";

export default class UserService {
    public userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getAll(): Promise<UserResponseDTO[]> {
        return await this.userRepository.getUsers();
    }

    private mapToUserResponse(user: IUser): UserResponseDTO {
        return new UserResponseDTO(user.id, user.email, user.username);
    }

    private mapToUserResponseArray(users: IUser[]): UserResponseDTO[] {
        return users.map((user) => this.mapToUserResponse(user));
    }
}
