import { CreatureException } from "./CreatureException";

export class CreatureUpdateException extends CreatureException {
    constructor(message: string, statusCode: number, error?: Error) {
        super(message, statusCode, error);
        this.name = 'CreatureUpdateException';
    }
}