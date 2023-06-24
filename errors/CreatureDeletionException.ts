import { CreatureException } from "./CreatureException";

export class CreatureDeletionException extends CreatureException {
    constructor(message: string, statusCode: number, error?: Error) {
        super(message, statusCode, error);
        this.name = 'CreatureDeletionException';
    }
}