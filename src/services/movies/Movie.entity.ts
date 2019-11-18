import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany } from 'typeorm';
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

    @JoinColumn({
        name: 'genre',
        referencedColumnName: 'id'
    })
    @ManyToMany(type => Genre, genre => genre.id)
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
            genre: this.genre,
            image: this.image,
        };
    }

}

export interface IMovie {
    id: number;
    title: string;
    description?: string;
    genre: IGenre[];
    image?: string;
}