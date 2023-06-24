export default class APIResponseDTO<T> {
    public message: string;
    public data?: T;
    public error?: T;
    constructor(message: string, data?: T, error?: any) {
        this.message = message;
        this.data = data;
        this.error = error;
    }
}