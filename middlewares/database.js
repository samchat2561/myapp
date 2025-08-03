const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE_NAME, 
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    }   
)

module.exports = sequelize;
