const { request, response } = require('express');
const { Sequelize } = require('sequelize');
const { Clan } = require('./models/clan_models');
const { UsersClan } = require('./models/users_clan_model');

const initialize = async () => {
  try {
    await Sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const getClanById = async (request, response) => {
  const id = parseInt(request.params.id);
  const clans = await Clan.findAll(
    {where: {
      id: id
    },}
  );
  if (clans == null) {
    response.send('Not found');
  }
  response.json(clans);
  console.log(clans.every(clan => clan instanceof Clan));
}

const getClans = async (request, response) => {
  try {
    const clans = await Clan.findAll();
    response.json(clans);
    console.log(clans.every(clan => clan instanceof Clan));
  } catch (error) {
    console.log(error);
  }
}



const createClan = async (request, response) => {
  const { leader_id, name, created_at } = request.body;
  try {
    await Clan.create({
      'leader_id':leader_id,
      'name':name,
      'created_at':created_at
    });
    response.send(`Clan created with name ${name}`);
  } catch (error) {
    console.log(error);
  }
}

const updateClan = async (request, response) => {
  const id = parseInt(request.params.id);
  const leader_id = request.body['leader_id'];
  const name = request.body['name'];
  const values = {};
  if (name) {values['name'] = name};
  if (leader_id) {values['leader_id'] = leader_id};
  try {
    await Clan.update(values,
    {
      where: {
        'id' : id
      }
    });
    response.send(`Clan updated with id ${id}`);
    } catch (error) {
      console.log(error);
    }
}

const deleteClan = async (request, response) => {
  const id = parseInt(request.params.id);
  try {  
    await Clan.destroy({
      where: {'id' : id}
    });
    response.send(`Clan deleted with id ${id}`);
  } catch (error) {
    console.log(error);
  }
}

const getUsersByClanId = async (request, response) => {
  const clanId = parseInt(request.params.id);
  try {
    const users = await UsersClan.findAll({
      where: {clan_id : clanId}
    });
    if (users == null) {
    response.send('Not found');
  }
    response.json(users);
    console.log(users.every(user => user instanceof UsersClan));
  } catch (error) {
    response.send(error);
  }
}

const addUserToClan = async (request, response) => {
  const clanId = parseInt(request.params.id);
  const userId = request.body['user_id'];
  console.log(userId);
  const isClanIdCorrect = Clan.findAll({where: {id : clanId}}) != null;
  if (isClanIdCorrect) {
    try {
      await UsersClan.create({
        'clan_id' : clanId,
        'user_id' : userId
      });
      response.send(`User with id ${userId} added to clan ${clanId}.`);
    } catch (error) {
      response.send(error);
    }
  }
}

module.exports = {
  initialize,
  getClanById,
  getClans,
  createClan,
  updateClan,
  deleteClan,
  getUsersByClanId,
  addUserToClan
};