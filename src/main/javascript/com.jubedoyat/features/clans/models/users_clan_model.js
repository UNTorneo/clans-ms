const { Sequelize, Model, DataTypes } = require('sequelize');
const { Clan } = require('./clan_models');

const {sequelize} = require('../controller/db');  

const UsersClan = sequelize.define('usersClan',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNullable: false,
        allowNull: false,
    },
    clanId: {
        type: DataTypes.INTEGER,
        field: 'clanId',
        unique: false,
        allowNullable: false,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'userId',
        allowNullable: false,
        allowNull: false,
    }
}, {
  sequelize,
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'usersClan',
  modelName: 'usersClan'
});

Clan.hasMany(UsersClan, {
    foreignKey: 'clanId'
});

UsersClan.belongsTo(Clan);

(async () => {
  await UsersClan.sync({  });
})();

module.exports = {
    UsersClan,
};