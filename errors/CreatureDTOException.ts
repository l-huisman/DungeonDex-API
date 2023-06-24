import { CreatureException } from "./CreatureException";

export class CreatureDTOException extends CreatureException {
    constructor(message: string, statusCode: number, error?: Error) {
        super(message, statusCode, error);
    }
}
