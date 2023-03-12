const { request, response } = require('express');
const { Sequelize } = require('sequelize');
const { Clan } = require('../models/clan_models');
const { UsersClan } = require('../models/users_clan_model');

const getClanById = async (request, response) => {
  const id = parseInt(request.params.id);
  const clans = await Clan.findAll(
    {where: {
      id: id
    },}
  );
  if (clans == null) {
    response.json({
      'msg' : 'Not found'
    });
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
    response.json({
      'msg' : error
    });
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
    response.json({
      'msg' : `Clan created`,
      'Clan data' : {
        'leader_id':leader_id,
        'name':name,
        'created_at':created_at
      }
    });
  } catch (error) {
    response.json({
      'msg' : error
    });
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
    response.json({
      'msg' : `Clan with id ${id} updated.`
    });
    } catch (error) {
      response.json({
        'msg' : error
      });
    }
}

const deleteClan = async (request, response) => {
  const id = parseInt(request.params.id);
  try {  
    await Clan.destroy({
      where: {'id' : id}
    });
    response.json({
      'msg' : `Clan with id ${id} deleted.`
    });
  } catch (error) {
    response.json({
      'msg' : error
    });
  }
}

const getUsersByClanId = async (request, response) => {
  const clan_id = parseInt(request.params.id);
  try {
    const users = await UsersClan.findAll({
      where: {'clan_id' : clan_id}
    });
    if (users == null) {
    response.json({
      'msg' : 'Not found'
    });
  }
    response.json(users);
    console.log(users.every(user => user instanceof UsersClan));
  } catch (error) {
    response.json({
        'msg' : error
      });
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
      response.json({
        'msg' : `User with id ${userId} added to clan with id ${clanId}`
      });
    } catch (error) {
      response.json({
        'msg' : error
      });
    }
  }
}

module.exports = {
  getClanById,
  getClans,
  createClan,
  updateClan,
  deleteClan,
  getUsersByClanId,
  addUserToClan
};