import { CustomExceptionBase } from "./CustomExceptionBase";

export class CreatureMappingException extends CustomExceptionBase {
    constructor(message: string, statusCode: number, error?: Error) {
        super(message, statusCode, error);
        this.name = "CreatureMappingException";
    }
}