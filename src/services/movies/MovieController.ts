import { Controller, Put, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { MovieService } from './MovieService';
import { OK } from 'http-status-codes';
import { Catch } from '../handlers/ErrorHandler';

@Controller('movie')
export class MovieController {

    @Put('')
    @Catch
    public async save(req: Request, res: Response): Promise<void> {
        const body = req.body;
        if (body.genre && body.genre.length) {
            console.log(body.genre.split(','));
            body.genre = body.genre.split(',').map((id: string) => {return {id: parseInt(id)};});
        }
        body.image = req.files.image;
        const movie = (await MovieService.save(body)).prepare();
        res.status(OK).json(movie);
    }

    @Post('')
    @Catch
    public async get(req: Request, res: Response): Promise<void> {
        const movies = (await MovieService.listMovies(req.body));
        res.status(OK).json({
            movies: movies[0].map(movie => movie.prepare()),
            count: movies[1]
        });
    }

}