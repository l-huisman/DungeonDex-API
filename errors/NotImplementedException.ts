import { CustomExceptionBase } from "./CustomExceptionBase";

export class NotImplementedException extends CustomExceptionBase {
    constructor(message: string, statusCode: number, error?: Error) {
        super(message, statusCode, error);
    }
}