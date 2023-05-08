const { request, response } = require('express');
const { Sequelize } = require('sequelize');
const { Clan } = require('../models/clan_models');
const { UsersClan } = require('../models/users_clan_model');
const axios = require('axios');

async function getUserById(userId) {
  try {
    const response = await axios.get(`http://localhost:8088/users/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
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
    response.json({
      'message' : 'Not found'
    });
  }
  response.json(clans[0]);
  console.log(clans);
}

const getClans = async (request, response) => {
  try {
    const clans = await Clan.findAll();
    response.json(clans);
    console.log(clans.every(clan => clan instanceof Clan));
  } catch (error) {
    response.json({
      'error' : error
    });
  }
}

const createClan = async (request, response) => {
  const { leaderId, name, createdAt } = request.body;
  try {
    await Clan.create({
      'leaderId':leaderId,
      'name':name,
      'createdAt':createdAt
    });
    console.log("Sí está ejecutando");
    response.json({
      'message' : `Clan created`
    });
  } catch (error) {
    response.json({
      'error' : error
    });
  }
}

const updateClan = async (request, response) => {
  const id = parseInt(request.params.id);
  const leaderId = request.body['leaderId'];
  const name = request.body['name'];
  const values = {};
  if (name) {values['name'] = name};
  if (leaderId) {values['leaderId'] = leaderId};
  try {
    await Clan.update(values,
    {
      where: {
        'id' : id
      }
    });
    response.json({
      'message' : `Clan with id ${id} updated.`
    });
    } catch (error) {
      response.json({
        'error' : error
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
      'message' : `Clan with id ${id} deleted.`
    });
  } catch (error) {
    response.json({
      'error' : error
    });
  }
}

const getUsersByClanId = async (request, response) => {
  const clanIdToFind = parseInt(request.params.id);
  try {
    const res = await UsersClan.findAll({
      where: {'clanId' : clanIdToFind}
    });
    if (res == null) {
      response.json({
        'message' : 'Not found'
      });
    }
    const users = res.map((e) => e.dataValues['userId']);
    const usersFromServer = users.map((userId) => getUserById(userId)
      .then(userData => {
        return userData;
      })
    );
    console.log(usersFromServer);
    response.json(usersFromServer);
  } catch (error) {
    console.log(error);
    response.json({
        'error' : error
      });
  }
}

const addUserToClan = async (request, response) => {
  const clanId = parseInt(request.params.id);
  const userId = request.body['userId'];
  const isClanIdCorrect = Clan.findAll({where: {id : clanId}}) != null;
  getUserById(userId)
    .then(async userData => {
      if (isClanIdCorrect) {
        try {
          await UsersClan.create({
            'clanId' : clanId,
            'userId' : userId
          });
          response.json({
            'message' : `User with id ${userId} added to clan with id ${clanId}`
          });
        } catch (error) {
          console.log(error);
          response.json(error);
        }
      }
    })
    .catch(error => {
      console.log(error);
      response.json({
        'error' : error
      })
    });
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