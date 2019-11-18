import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from '../movies/Movie.entity';

@Entity()
export class Genre {

    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({
        length: 255,
        unique: true,
        nullable: false
    })
    public title: string;

    @ManyToMany(type => Movie, movie => movie.genre)
    public movies: Movie[];

}

export interface IGenre {
    id: number;
    title: string;
}