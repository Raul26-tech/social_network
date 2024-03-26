import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnStatusOnToken1705531280989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users_token",
      new TableColumn({
        name: "status",
        type: "varchar",
        isNullable: true,
        comment: "inactive / active",
        default: "'active'",
      })
    );

    await queryRunner.query(
      "update users_token set status = 'inactive' where status is null"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("users_token", ["status"]);
  }
}
