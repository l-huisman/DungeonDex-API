import { CreatureException } from "./CreatureException";

export class CreatureNotFoundException extends CreatureException {
    constructor(message: string, statusCode: number, error?: Error) {
        super(message, statusCode, error);
        this.name = 'CreatureNotFoundException';
    }
}