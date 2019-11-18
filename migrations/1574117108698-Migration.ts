import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1574117108698 implements MigrationInterface {
    name = 'Migration1574117108698'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(1000) NOT NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `movie` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` varchar(1000) NULL, `image` varchar(1000) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `genre` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, UNIQUE INDEX `IDX_1d3149227466edab0044767a78` (`title`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("INSERT INTO genre(title) values ('terror')");
        await queryRunner.query("INSERT INTO genre(title) values ('drama')");
        await queryRunner.query("INSERT INTO genre(title) values ('comedy')");
        await queryRunner.query("INSERT INTO genre(title) values ('action')");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_1d3149227466edab0044767a78` ON `genre`", undefined);
        await queryRunner.query("DROP TABLE `genre`", undefined);
        await queryRunner.query("DROP TABLE `movie`", undefined);
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
