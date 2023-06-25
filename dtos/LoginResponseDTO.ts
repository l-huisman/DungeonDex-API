export default class LoginResponseDTO {
    public id: string;
    public email: string;
    public username: string;
    public token: string;
    constructor(id: string, email: string, username: string, token: string) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.token = token;
    }
}