import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRefreshToken1712103437456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "refresh_tokens",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isUnique: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "email",
            type: "varchar",
          },

          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "issued_at",
            type: "timestamp",
          },
          {
            name: "expiration_time",
            type: "timestamp",
          },
          {
            name: "token",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserToken",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_token");
  }
}
