import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

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
  },
  leader_id: {
    type: DataTypes.CHAR(65),
    allowNullable: false,
  },
  name: {
    type: DataTypes.CHAR(45),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Clan'
});

export default {
  Clan,
};