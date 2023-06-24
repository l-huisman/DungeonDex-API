// CreatureException class

export class CreatureException extends Error {
    statusCode: number;
    error?: Error;
    constructor(message: string, statusCode: number, error?: Error) {
        super(message);
        this.name = 'CreatureException';
        this.statusCode = statusCode;
        this.error = error;
    }
}