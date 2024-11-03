import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: "postgres", // explicitly set to 'postgres'
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // for testing or self-signed certificates
            }
        }
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Some error occurred\n" + error);
    }
})();

export default sequelize;
