
import { Logger } from '@overnightjs/logger';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';

export function Catch(target: any, key: string, descriptor: TypedPropertyDescriptor<any>): any {
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Request, res: Response): Promise<any> {
        try {
            return await Reflect.apply(originalMethod, this, [req, res]);
        } catch (error) {
            Logger.Err(error);
            const status = INTERNAL_SERVER_ERROR;
            res.status(status).json({errorMessage: getStatusText(status)})
        }
    };
    return descriptor;
}