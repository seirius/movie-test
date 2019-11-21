import { Controller, Put, Get, Patch, Delete, ClassMiddleware } from "@overnightjs/core";
import { Catch } from "../handlers/ErrorHandler";
import { Request, Response } from "express";
import { UserService } from "./UserService";
import { CREATED, NOT_FOUND, OK } from "http-status-codes";
import { HttpError } from "../handlers/HttpError";
import { v4 } from 'uuid';
import { Logger } from "@overnightjs/logger";
import { authenticate } from 'passport';
import { auth } from "../handlers/Auth";

/**
 * @swagger
 * definitions:
 *  User:
 *      type: object
 *      required:
 *          - username
 *      properties:
 *          id:
 *              type: number
 *          username:
 *              type: string
 */
@Controller('user')
@ClassMiddleware([auth])
export class UserController {

    constructor() {
        this.init();
    }

    private async init(): Promise<void> {
        try {
            let user = await UserService.get('root');
            const rootUser = {
                username: 'root',
                password: v4(),
            };
            if (user) {
                await UserService.update(rootUser);
            } else {
                await UserService.save(rootUser);
            }
            Logger.Info(`root password: ${rootUser.password}`);
        } catch (error) {
            Logger.Err(error);
        }
    }

    /**
     * @swagger
     * /user/{username}:
     *  get:
     *      tags:
     *          - user
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: path
     *            name: username
     *            type: string
     *      responses:
     *          200:
     *              description: user
     *              schema:
     *                  $ref: '#/definitions/User'
     *          404:
     *              description: not found
     */
    @Get(':username')
    @Catch
    public async get(req: Request, res: Response): Promise<void> {
        const user = await UserService.get(req.params.username);
        if (!user) {
            throw new HttpError('Not found', NOT_FOUND);
        }
        res.status(OK).json(user.prepare());
    }

    /**
     * @swagger
     * /user:
     *  put:
     *      tags:
     *          - user
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: body
     *            name: user
     *            required: true
     *            schema:
     *              type: object
     *              required:
     *                  - username
     *                  - password
     *              properties:
     *                  username:
     *                      type: string
     *                  password:
     *                      type: string
     *      responses:
     *          201:
     *              description: user created
     */
    @Put('')
    @Catch
    public async save(req: Request, res: Response): Promise<void> {
        const user = await UserService.save(req.body);
        res.status(CREATED).json(user.prepare());
    }

    /**
     * @swagger
     * /user/{username}:
     *  patch:
     *      tags:
     *          - user
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: path
     *            name: username
     *            type: string
     *            required: true
     *          - in: body
     *            name: user
     *            required: true
     *            schema:
     *              type: object
     *              required:
     *                  - password
     *              properties:
     *                  password:
     *                      type: string
     *      responses:
     *          200:
     *              description: ok
     *      
     */
    @Patch(':username')
    @Catch
    public async update(req: Request, res: Response): Promise<void> {
        const body = req.body;
        body.username = req.params.username;
        await UserService.update(body);
        res.status(OK).json({success: true});
    }

    /**
     * @swagger
     * /user/{username}:
     *  delete:
     *      tags:
     *          - user
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: path
     *            name: username
     *            type: string
     *            required: true
     *      responses:
     *          200:
     *              description: ok
     *      
     */
    @Delete(':username')
    @Catch
    public async delete(req: Request, res: Response): Promise<void> {
        await UserService.delete(req.params.username);
        res.status(OK).json({success: true});
    }

}