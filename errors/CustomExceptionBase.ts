export class CustomExceptionBase extends Error {
    statusCode: number;
    error?: Error;
    constructor(message: string, statusCode: number, error?: Error) {
        super(message);
        this.name = 'CustomExceptionBase';
        this.statusCode = statusCode;
        this.error = error;
    }
}