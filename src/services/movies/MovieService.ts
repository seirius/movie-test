import { Movie } from './Movie.entity';
import { getRepository, Transaction, TransactionRepository, Repository, FindManyOptions, Like, In } from 'typeorm';
import { IGenre } from '../genres/Genre.entity';
import { UploadedFile } from 'express-fileupload';
import { promises } from 'fs';
import { join } from 'path';

export class MovieService {

    public static readonly IMAGES_DIRECTORY = join(__dirname, '..', '..', '..', 'resources', 'images');

    @Transaction()
    public static async save(
        args: ISaveMovieArgs,
        @TransactionRepository(Movie) movieRepository?: Repository<Movie>
    ): Promise<Movie> {
        const movie = new Movie();
        movie.title = args.title;
        movie.description = args.description;
        movie.genre = args.genre as any;
        if (args.image) {
            await promises
            .writeFile(join(MovieService.IMAGES_DIRECTORY, args.image.name), args.image.data);
        }
        movie.image = args.image.name;
        return await getRepository(Movie).save(movie);
    }

    public static async listMovies(args: IListMoviesArgs): Promise<[Movie[], number]> {
        const { 
            title,
            description,
            genre,
            min,
            max,
         } = args;
         let skip: number, take: number;
         if (min !== undefined && max !== undefined) {
            skip = min;
            take = max - min;
         }
        const where: FindManyOptions<Movie> = {
            relations: ['genre'],
            where: {},
            skip, take
        };
        if (title !== undefined) {
            where.where['title'] = Like(title);
        }
        if (description !== undefined) {
            where.where['description'] = Like(description);
        }
        if (genre !== undefined) {
            where.where['genre'] = In(genre);
        }
        return getRepository(Movie).findAndCount(where);
    }

}

export interface ISaveMovieArgs {
    title: string;
    description?: string;
    genre: IGenre[];
    image: UploadedFile;
}

export interface IListMoviesArgs {
    title?: string;
    description?: string;
    genre: number[];
    min?: number;
    max?: number;
}