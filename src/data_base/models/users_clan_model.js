const { Sequelize, Model, DataTypes } = require('sequelize');
const { Clan } = require('./clan_models');

const sequelize = new Sequelize('api', 'admin', 'bedoya2501', {
  host: 'localhost',
  dialect: 'postgres',
});

class UsersClan extends Model {
  id;
  clan_id;
  user_id;
}

UsersClan.init({
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
        allowNullable: false,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNullable: false,
        allowNull: false,
    }
}, {
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'users_clan',
  sequelize,
  modelName: 'users_clan'
});

Clan.hasMany(UsersClan, {
    foreignKey: UsersClan.clan_id,
});

UsersClan.belongsTo(Clan);

module.exports = {
    UsersClan,
};