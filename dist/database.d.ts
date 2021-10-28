import { ConfigDatabaseInterface, Connector, DatabasePackage, AbstractRepository } from "sdz-agent-types";
declare class Database {
    private config;
    private connector;
    private drivers;
    private repository;
    constructor(config: ConfigDatabaseInterface);
    connect(): void;
    getConnector(): Connector;
    getDriver(): DatabasePackage;
    getRepository(): AbstractRepository;
    disconnect(): void;
}
export default Database;
