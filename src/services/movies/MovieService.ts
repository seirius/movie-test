import { Movie } from './Movie.entity';
import { getRepository } from 'typeorm';
import { IGenre } from '../genres/Genre.entity';

export class MovieService {

    public static save(args: ISaveMovieArgs): Promise<Movie> {
        return getRepository(Movie).save(args);
    }

}

export interface ISaveMovieArgs {
    title: string;
    description?: string;
    genre: IGenre[];
}