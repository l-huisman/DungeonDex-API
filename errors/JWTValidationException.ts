import { CustomExceptionBase } from "./CustomExceptionBase";

export class JWTValidationException extends CustomExceptionBase {
    constructor(message: string, statusCode: number, error?: any) {
        super(message, statusCode, error);
    }
}