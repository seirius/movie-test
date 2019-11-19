import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationInsert implements MigrationInterface {
    name = 'Migration9999999999999999'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("INSERT INTO genre(title) values ('terror')");
        await queryRunner.query("INSERT INTO genre(title) values ('drama')");
        await queryRunner.query("INSERT INTO genre(title) values ('comedy')");
        await queryRunner.query("INSERT INTO genre(title) values ('action')");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
