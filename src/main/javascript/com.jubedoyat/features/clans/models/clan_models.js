const {  Model, DataTypes } = require('sequelize');

const {sequelize} = require('../controller/db');

const Clan= sequelize.define('clans',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNullable: false,
    allowNull: false,
  },
  leaderId: {
    field: 'leaderId',
    type: DataTypes.CHAR(65),
    allowNull: false,
  },
  name: {
    type: DataTypes.CHAR(45),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'createdAt'
  }
}, {
  sequelize,
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'clans',
  modelName: 'clans'
});

(async () => {
  await Clan.sync({  });
})();

module.exports = {
  Clan,
}