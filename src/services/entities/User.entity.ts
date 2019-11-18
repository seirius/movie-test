import { Entity, Column, PrimaryGeneratedColumn, getRepository } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        length: 255,
        nullable: false,
        unique: true
    })
    public username: string;

    @Column({
        length: 1000,
        nullable: false,
    })
    public password: string;

}