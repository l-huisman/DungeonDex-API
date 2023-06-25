import { CustomExceptionBase } from "./CustomExceptionBase";

export class CreatureUpdateException extends CustomExceptionBase {
    constructor(message: string, statusCode: number, error?: Error) {
        super(message, statusCode, error);
        this.name = 'CreatureUpdateException';
    }
}