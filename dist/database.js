"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdz_agent_database_firebird_1 = __importDefault(require("sdz-agent-database-firebird"));
const sdz_agent_database_informix_1 = __importDefault(require("sdz-agent-database-informix"));
const sdz_agent_database_mongodb_1 = __importDefault(require("sdz-agent-database-mongodb"));
const sdz_agent_database_mssql_1 = __importDefault(require("sdz-agent-database-mssql"));
const sdz_agent_database_mysql_1 = __importDefault(require("sdz-agent-database-mysql"));
const sdz_agent_database_oracle_1 = __importDefault(require("sdz-agent-database-oracle"));
const sdz_agent_database_odbc_1 = __importDefault(require("sdz-agent-database-odbc"));
class Database {
    constructor(config) {
        this.drivers = {
            firebird: sdz_agent_database_firebird_1.default,
            informix: sdz_agent_database_informix_1.default,
            oracle: sdz_agent_database_oracle_1.default,
            mongodb: sdz_agent_database_mongodb_1.default,
            mssql: sdz_agent_database_mssql_1.default,
            mysql: sdz_agent_database_mysql_1.default,
            odbc: sdz_agent_database_odbc_1.default,
        };
        this.config = config;
    }
    connect() {
        try {
            // ATTEMPT TO CONNECT
            const connector = this.getDriver().Connector;
            this.connector = new connector(this.config);
            this.connector.connect();
        }
        catch (e) { }
    }
    getConnector() {
        if (!this.connector) {
            this.connect();
        }
        return this.connector;
    }
    getDriver() {
        return this.drivers[this.config["driver"].toLowerCase()];
    }
    getRepository() {
        if (!this.repository) {
            const repository = this.getDriver().Repository;
            this.repository = new repository(this.getConnector());
        }
        return this.repository;
    }
    disconnect() {
        // this.connector.close();
    }
}
exports.default = Database;
