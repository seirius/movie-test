import { use as PassportUse, serializeUser, deserializeUser, authenticate } from 'passport';
import { Strategy } from 'passport-local';
import { UserService } from './UserService';
import { compare } from './Crypto';
import { Controller, Post, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import { Catch } from '../handlers/ErrorHandler';

PassportUse(new Strategy(async (username, password, done) => {
    const user = await UserService.get(username);
    if (!user) {
        return done(null, false);
    }
    if (!await compare(password, user.password)) {
        return done(null, false);
    }
    return done(null, user.prepare());
}));

serializeUser((user: any, done) => {
    if (user && user.id) {
        done(null, user.id);
    } else {
        done(null, false);
    }
});

deserializeUser(async (id: number, done) => {
    try {
        const user = await UserService.getById(id);
        if (user) {
            done(null, user.prepare());
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, null);
    }
});

@Controller('login')
export class LoginController {

    /**
     * @swagger
     * /login:
     *  post:
     *      tags:
     *          - login
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: body
     *            name: user
     *            required: true
     *            schema:
     *              type: object
     *              properties:
     *                  username:
     *                      type: string
     *                  password:
     *                      type: string
     *      responses:
     *          401:
     *              description: Unauthorized
     *          200:
     *              description: ok
     *              schema:
     *                  $ref: '#/definitions/User'
     */
    @Post('')
    @Middleware([authenticate('local')])
    @Catch
    public async login(req: Request, res: Response): Promise<void> {
        console.log(req.user);
        res.status(OK).json(req.user);
    }

}