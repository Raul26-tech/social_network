import { DataSource, EntityManager } from "typeorm";
import { inject, injectable, optional } from "inversify";
import { AppDataSource } from "@shared/infra/db/connectDatabase";

@injectable()
class BaseRepository {
  protected dataSource: DataSource | EntityManager;

  constructor(
    @inject("Manager")
    @optional()
    private _manager?: EntityManager
  ) {
    this.dataSource = this._manager ? this._manager : AppDataSource;
  }
}

export { BaseRepository };
