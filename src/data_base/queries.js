import { Sequelize } from 'sequelize';
import clan_models from './models/clan_models.js';

const sequelize = new Sequelize('postgres://user:pass@example.com:5432/api')

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const getClans = async () => {
  const clans = await clan_models.Clan.findAll();
  console.log(clans.every(clan => clan instanceof clan_models.Clan));
}

const getClanById = async (request, response) => {
  const id = parseInt(request.params.id);
  const clans = await clan_models.Clan.findAll({
    where: {
      id: id
    }
  });
  console.log(clans.every(clan => caln instanceof clan_models.Clan));
}

const createClan = async (request, response) => {
  const { leader_id, name, created_at } = request.body;

  await clan_models.Clan.create({
    'leader_id':leader_id,
    'name':name,
    'created_at':created_at
  });
}

const updateClan = async (request, response) => {
  const id = parseInt(request.params.id);
  const { leader_id, name, created_at } = request.body;

  await clan_models.Clan.update({
    'leader_id' : leader_id,
    'name' : name,
    'created_at' : created_at
  }, {
    where: {
      'id' : id
    }
  });
}

const deleteClan = async (request, response) => {
  const id = parseInt(request.params.id);
  await clan_models.Clan.destroy({
    where: {'id' : id}
  });
}

export default {
    getClanById,
    getClans,
    createClan,
    updateClan,
    deleteClan
};