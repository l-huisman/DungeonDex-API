export default class UserResponseDTO {
    public id: string;
    public email: string;
    public username: string;
    constructor(id: string, email: string, username: string) {
        this.id = id;
        this.email = email;
        this.username = username;
    }
}