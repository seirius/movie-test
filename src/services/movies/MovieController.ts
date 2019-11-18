import { Controller, Put, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { IMovie } from './Movie.entity';
import { MovieService } from './MovieService';

@Controller('movie')
export class MovieController {

    @Put('')
    public async save(req: Request, res: Response): Promise<IMovie> {
        return (await MovieService.save(req.body)).prepare();
    }

    @Get('')
    public get(): string {
        return 'asfafs';
    }

}