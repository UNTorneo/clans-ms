const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('api', 'admin', 'bedoya2501', {
  host: 'localhost',
  dialect: 'postgres',
});

class Clan extends Model {
  id;
  leader_id;
  name;
  created_at;
}

Clan.init({
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
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'clans',
  sequelize,
  modelName: 'clan'
});

module.exports = {
  Clan,
}