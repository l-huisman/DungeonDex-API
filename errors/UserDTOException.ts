import { CustomExceptionBase } from "./CustomExceptionBase";

export class UserDTOException extends CustomExceptionBase {
    constructor(message: string, statusCode: number, error?: Error) {
        super(message, statusCode, error);
        this.name = 'UserDTOException';
    }
}