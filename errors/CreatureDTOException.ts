import { CustomExceptionBase } from "./CustomExceptionBase";

export class CreatureDTOException extends CustomExceptionBase {
    constructor(message: string, statusCode: number, error?: Error) {
        super(message, statusCode, error);
    }
}
