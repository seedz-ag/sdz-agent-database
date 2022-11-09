import {
  ConfigDatabaseInterface,
  Connector,
  DatabasePackage,
  AbstractRepository,
} from "sdz-agent-types";

import Firebird from "sdz-agent-database-firebird";
import Informix from "sdz-agent-database-informix";

import MSSQL from "sdz-agent-database-mssql";
import MySQL from "sdz-agent-database-mysql";
import Oracle from "sdz-agent-database-oracle";
import ODBC from "sdz-agent-database-odbc";

class Database {
  private config: ConfigDatabaseInterface;
  private connector: Connector;
  private drivers = {
    firebird: Firebird,
    informix: Informix,
    oracle: Oracle,
    mssql: MSSQL,
    mysql: MySQL,
    odbc: ODBC
  };
  private repository: AbstractRepository;
  constructor(config: ConfigDatabaseInterface) {
    this.config = config;
  }
  connect(): void {
    try {
      // ATTEMPT TO CONNECT
      const connector = this.getDriver().Connector as any;
      this.connector = new connector(this.config);
      this.connector.connect();
    } catch (e) {}
  }
  getConnector(): Connector {
    if (!this.connector) {
      this.connect();
    }
    return this.connector;
  }
  getDriver(): DatabasePackage {
    return this.drivers[this.config["driver"].toLowerCase()];
  }
  getRepository(): AbstractRepository {
    if (!this.repository) {
      const repository = this.getDriver().Repository as any;
      this.repository = new repository(this.getConnector());
    }
    return this.repository;
  }
  disconnect() {
    // this.connector.close();
  }
}

export default Database;
