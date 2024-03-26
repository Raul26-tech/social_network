import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddingNewColumnsOnCreateUser1711409955313
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("users", [
      new TableColumn({
        name: "avatar",
        type: "varchar",

        isNullable: true,
      }),

      new TableColumn({
        name: "phone",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "cell_phone",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "postal_code",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "street",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "number",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "district",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "state",
        type: "varchar",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("users", [
      "avatar",
      "phone",
      "cell_phone",
      "postal_code",
      "street",
      "number",
      "district",
      "state",
    ]);
  }
}
