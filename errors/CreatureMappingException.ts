import { CreatureException } from "./CreatureException";

export class CreatureMappingException extends CreatureException {
    constructor(message: string, statusCode: number, error?: Error) {
        super(message, statusCode, error);
        this.name = "CreatureMappingException";
    }
}