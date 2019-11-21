import { INTERNAL_SERVER_ERROR } from "http-status-codes";

export class HttpError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode = INTERNAL_SERVER_ERROR) {
        super(message);
        this.statusCode = statusCode;
    }
}