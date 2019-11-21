import { Movie } from './Movie.entity';
import { getRepository, Transaction, TransactionRepository, Repository, FindManyOptions, Like, In, createQueryBuilder } from 'typeorm';
import { IGenre, Genre } from '../genres/Genre.entity';
import { UploadedFile } from 'express-fileupload';
import { promises } from 'fs';
import { join } from 'path';
import { HttpError } from '../handlers/HttpError';
import { NOT_FOUND } from 'http-status-codes';

export class MovieService {

    public static readonly IMAGES_DIRECTORY = join(__dirname, '..', '..', '..', 'resources', 'images');

    public static get(id: number): Promise<Movie> {
        return getRepository(Movie).findOne(id);
    }

    @Transaction()
    public static async save(
        args: ISaveMovieArgs,
        @TransactionRepository(Movie) movieRepository?: Repository<Movie>
    ): Promise<Movie> {
        const movie = new Movie();
        movie.title = args.title;
        movie.description = args.description;
        movie.genre = await getRepository(Genre).find({where: {title: In(args.genre)}});
        if (args.image) {
            await MovieService.writeImage(args.image.name, args.image.data);
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
        const query = createQueryBuilder(Movie, 'movie')
        .leftJoinAndSelect('movie.genre', 'genre');
        if (min !== undefined && max !== undefined) {
            let skip = min;
            let take = max - min;
            query.skip(skip)
            query.take(take);
        }


        if (title !== undefined) {
            query.where('movie.title like :title', {title: `%${title}%`})
        }
        if (description !== undefined) {
            query.where('movie.description like :description', {title: `%${description}%`})
        }
        if (genre !== undefined && genre.length) {
            query.where('genre.title IN (:genre)', {genre});
        }

        return query.getManyAndCount();
    }

    @Transaction()
    public static async update(
        args: IUpdateMovieArgs,
        @TransactionRepository(Movie) movieRepository?: Repository<Movie>
    ): Promise<void> {
        const movie = await movieRepository.findOne(args.id);
        if (!movie) {
            throw new HttpError('movie not found', NOT_FOUND);
        }
        ['title', 'description'].forEach((key) => {
            if (key in args) {
                movie[key] = args[key];
            }
        });

        if (args.genre) {
            movie.genre = await getRepository(Genre).find({where: {title: In(args.genre)}})
        }

        if (args.image) {
            movie.image = args.image.name;
        }

        await movieRepository.save(movie);

        if (args.image) {
            await MovieService.writeImage(args.image.name, args.image.data);
        }
    }

    public static async delete(id: number): Promise<void> {
        await getRepository(Movie).delete(id);
    }

    private static writeImage(fileName: string, data: any): Promise<void> {
        return promises
        .writeFile(join(MovieService.IMAGES_DIRECTORY, fileName), data)
    }

}

export interface ISaveMovieArgs {
    title: string;
    description?: string;
    genre: string[];
    image: UploadedFile;
}

export interface IListMoviesArgs {
    title?: string;
    description?: string;
    genre: string[];
    min?: number;
    max?: number;
}

export interface IUpdateMovieArgs {
    id: number;
    title?: string;
    description?: string;
    genre?: string[];
    image?: UploadedFile;
}