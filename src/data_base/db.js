const { Sequelize, Model, DataTypes } = require('sequelize');

const dbName = process.env.dbName || 'api'
const dbUser = process.env.dbUser || 'admin'
const dbPassword = process.env.dbPassword || 'bedoya2501'
const dbUrl = process.env.dbUrl || 'localhost'
const dbPort = process.env.dbPort || '5432'

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbUrl,
  dialect: 'postgres',
  port: dbPort,
});



(async () => 
  sequelize.authenticate()
    .then(e=>console.log('Connection has been established successfully.'))
    .catch(err=>console.error('Unable to connect to the database:', err))
)();

module.exports = { sequelize }