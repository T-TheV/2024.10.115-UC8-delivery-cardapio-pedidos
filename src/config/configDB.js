const { Sequelize } = require( "sequelize" )
require('dotenv').config()

// Criei a configuração do Sequelize para conectar com o PostgreSQL
// Uso as variáveis de ambiente para manter as credenciais seguras
const sequelize = new Sequelize (
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        // Habilitei o logging para debugar consultas SQL durante desenvolvimento
        logging: true, // Opcional -> O logging ira imprimir tudo que esta sendo executado dentro do banco de dados.
    }
)

module.exports = { sequelize }