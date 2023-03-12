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
  leader_id: {
    type: DataTypes.CHAR(65),
    allowNull: false,
  },
  name: {
    type: DataTypes.CHAR(45),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at'
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