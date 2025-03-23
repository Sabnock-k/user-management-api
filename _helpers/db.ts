import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "../ormconfig.json";
import { User } from "../users/user.entity";

const { host, port, username, password, database } = config;

export const AppDataSource = new DataSource({
    type: "mysql",
    host,
    port: Number(port),
    username,
    password,
    database,
    synchronize: true,
    logging: false,
    entities: [User],
});

export const initializeDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected!");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
};