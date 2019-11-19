import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1574204258988 implements MigrationInterface {
    name = 'Migration1574204258988'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(1000) NOT NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `movie` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` varchar(1000) NULL, `image` varchar(1000) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `genre` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, UNIQUE INDEX `IDX_1d3149227466edab0044767a78` (`title`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `movie_genre_genre` (`movieId` int NOT NULL, `genreId` int NOT NULL, INDEX `IDX_3a4b81efbd4fdd362fd1187fac` (`movieId`), INDEX `IDX_ab0be65b579c5b4a70d9b676c5` (`genreId`), PRIMARY KEY (`movieId`, `genreId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `movie_genre_genre` ADD CONSTRAINT `FK_3a4b81efbd4fdd362fd1187facb` FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `movie_genre_genre` ADD CONSTRAINT `FK_ab0be65b579c5b4a70d9b676c54` FOREIGN KEY (`genreId`) REFERENCES `genre`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `movie_genre_genre` DROP FOREIGN KEY `FK_ab0be65b579c5b4a70d9b676c54`", undefined);
        await queryRunner.query("ALTER TABLE `movie_genre_genre` DROP FOREIGN KEY `FK_3a4b81efbd4fdd362fd1187facb`", undefined);
        await queryRunner.query("DROP INDEX `IDX_ab0be65b579c5b4a70d9b676c5` ON `movie_genre_genre`", undefined);
        await queryRunner.query("DROP INDEX `IDX_3a4b81efbd4fdd362fd1187fac` ON `movie_genre_genre`", undefined);
        await queryRunner.query("DROP TABLE `movie_genre_genre`", undefined);
        await queryRunner.query("DROP INDEX `IDX_1d3149227466edab0044767a78` ON `genre`", undefined);
        await queryRunner.query("DROP TABLE `genre`", undefined);
        await queryRunner.query("DROP TABLE `movie`", undefined);
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
