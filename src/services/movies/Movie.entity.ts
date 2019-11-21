import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Genre, IGenre } from '../genres/Genre.entity';

@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        nullable: false,
        length: 255
    })
    public title: string;

    @Column({
        nullable: true,
        length: 1000
    })
    public description: string;

    @JoinTable()
    @ManyToMany(type => Genre, genre => genre.movies, {
        cascade: true
    })
    public genre: Genre[];

    @Column({
        nullable: true,
        length: 1000
    })
    public image: string;

    public prepare(): IMovie {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            genre: this.genre ? this.genre.map((genre) => genre.title) : undefined,
            image: this.image,
        };
    }

}

export interface IMovie {
    id: number;
    title: string;
    description?: string;
    genre?: string[];
    image?: string;
}