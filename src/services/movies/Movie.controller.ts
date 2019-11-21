import { Controller, Put, Post, Patch, Delete, Get, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { MovieService } from './MovieService';
import { OK, BAD_REQUEST, NOT_FOUND, CREATED } from 'http-status-codes';
import { Catch } from '../handlers/ErrorHandler';
import { HttpError } from '../handlers/HttpError';
import { authenticate } from 'passport';
import { auth } from '../handlers/Auth';

/**
 * @swagger
 * definitions:
 *  Movie:
 *      type: object
 *      required:
 *          - title
 *      properties:
 *          title:
 *              type: string
 *          description:
 *              type: string
 *          genre:
 *              type: array
 *              items:
 *                  type: string
 *          image:
 *              type: string
 *          
 */
@Controller('movie')
export class MovieController {

    /**
     * @swagger
     * /movie:
     *  put:
     *      tags:
     *          - movie
     *      consumes:
     *          - multipart/form-data
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: formData
     *            name: image
     *            type: file
     *          - in: formData
     *            name: title
     *            required: true
     *            type: string
     *          - in: formData
     *            name: description
     *            type: string
     *          - in: formData
     *            name: genre
     *            schema:
     *              type: array
     *              items:
     *                  type: string
     *      responses:
     *          201:
     *              description: ok
     *              schema:
     *                  $ref: '#/definitions/Movie' 
     *              
     *              
     */             
    @Put('')
    @Middleware([auth])
    @Catch
    public async save(req: Request, res: Response): Promise<void> {
        const body = req.body;
        if (typeof body.genre === 'string') {
            body.genre = JSON.parse(body.genre);
        }
        if (req.files) {
            body.image = req.files.image;
        }
        const movie = (await MovieService.save(body)).prepare();
        res.status(CREATED).json(movie);
    }

    /**
     * @swagger
     * /movie:
     *  post:
     *      tags:
     *          - movie
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: body
     *            required: false
     *            schema:
     *              type: object
     *              properties:
     *                  title:
     *                      type: string
     *                  description:
     *                      type: string
     *                  genre:
     *                      type: array
     *                      items:
     *                          type: string
     *                  min:
     *                      type: number
     *                      description: min num pag
     *                  max:
     *                      type: number
     *                      description: max num pag
     *      responses:
     *          200:
     *              description: movie list with pagination count
     *              schema:
     *                  type: object
     *                  properties:
     *                      movies:
     *                          type: array
     *                          items:
     *                              $ref: '#/definitions/Movie'
     *                      count:
     *                          type: number
     */
    @Post('')
    @Catch
    public async list(req: Request, res: Response): Promise<void> {
        const body = req.body ? req.body : {};
        const movies = (await MovieService.listMovies(body));
        res.status(OK).json({
            movies: movies[0].map(movie => movie.prepare()),
            count: movies[1]
        });
    }

    /**
     * @swagger
     * /movie/{id}:
     *  patch:
     *      tags:
     *          - movie
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: path
     *            required: true
     *            name: id
     *            type: number
     *          - in: body
     *            required: true
     *            schema:
     *              type: object
     *              properties:
     *                  title:
     *                      type: string
     *                  description:
     *                      type: string
     *                  genre:
     *                      type: array
     *                      items:
     *                          type: string
     *      responses:
     *          200:
     *              description: ok
     */
    @Patch(':id')
    @Middleware([auth])
    @Catch
    public async update(req: Request, res: Response): Promise<void> {
        if (isNaN(req.params.id as any)) {
            throw new HttpError('ID is not valid', BAD_REQUEST);
        }
        const body = req.body;
        if (typeof body.genre === 'string') {
            body.genre = JSON.parse(body.genre);
        }
        body.id = parseInt(req.params.id);
        if (req.files) {
            body.image = req.files.image;
        }
        await MovieService.update(body);
        res.status(OK).json({success: true});
    }

    /**
     * @swagger
     * /movie/{id}:
     *  delete:
     *      tags:
     *          - movie
     *      produces:
     *          - appplication/json
     *      parameters:
     *          - in: path
     *            required: true
     *            name: id
     *            type: number
     *      responses:
     *          200:
     *              description: ok
     */
    @Delete(':id')
    @Middleware([auth])
    @Catch
    public async delete(req: Request, res: Response): Promise<void> {
        if (isNaN(req.params.id as any)) {
            throw new HttpError('ID is not valid', BAD_REQUEST);
        }
        await MovieService.delete(parseInt(req.params.id));
        res.status(OK).json({success: true});
    }

    /**
     * @swagger
     * /movie/{id}:
     *  get:
     *      tags:
     *          - movie
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: path
     *            required: true
     *            name: id
     *            type: number
     *      responses:
     *          200:
     *              description: ok
     */
    @Get(':id')
    @Catch
    public async get(req: Request, res: Response): Promise<void> {
        if (isNaN(req.params.id as any)) {
            throw new HttpError('ID is not valid', BAD_REQUEST);
        }
        const movie = await MovieService.get(parseInt(req.params.id));
        if (!movie) {
            throw new HttpError('Not found', NOT_FOUND);
        }
        res.status(OK).json(movie.prepare());
    }

}