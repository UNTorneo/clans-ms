const { Sequelize, Model, DataTypes } = require('sequelize');
const { Clan } = require('./clan_models');

const {sequelize} = require('../db');  

const UsersClan = sequelize.define('users_clan',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNullable: false,
        allowNull: false,
    },
    clan_id: {
        type: DataTypes.INTEGER,
        field: 'clan_id',
        unique: true,
        allowNullable: false,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNullable: false,
        allowNull: false,
    }
}, {
  sequelize,
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'users_clan',
  modelName: 'users_clan'
});

Clan.hasMany(UsersClan);

UsersClan.belongsTo(Clan);

(async () => {
  await UsersClan.sync({  });
})();

module.exports = {
    UsersClan,
};