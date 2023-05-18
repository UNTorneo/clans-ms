const { request, response } = require('express');
const { Sequelize } = require('sequelize');
const { Clan } = require('../models/clan_models');
const { UsersClan } = require('../models/users_clan_model');
const axios = require('axios');

async function getUserById(userId) {
  try {
    const response = await axios.get(`https://users-microservice-fastapi-4yiv26znhq-uc.a.run.app/users/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const getClanById = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
  const clans = await Clan.findAll(
    {where: {
      id: id
    },}
  );
  console.log(clans);
  if (clans == null) {
    response.json({
      'error' : 'Not found'
    });
  }
  response.json(clans);
  } catch (error) {
    response.json({
      'error':error
    });
  }
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
    getUserById(leaderId)
      .then(async (res) => {
        await Clan.create({
          'leaderId':leaderId,
          'name':name,
          'createdAt':createdAt
        });
        response.json({
          'message' : `Clan created`
        });
      }) .catch((error) => {
        response.json({
          'error':error
        });
      })
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
  const isClanIdCorrect = Clan.findAll({where: {id : id}}) != null;
  if (isClanIdCorrect) {
    try {
      getUserById(leaderId)
        .then(async (userData) => {
          console.log(userData);
          await Clan.update(values,
          {
            where: {
              'id' : id
            }
          });
          response.json({
            'message' : `Clan with id ${id} updated.`
          });
        })
        .catch(error => {
          response.json({
            'error':error
          });
        })
    } catch (error) {
      response.json({
        'error' : error
      });
    }
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
    var usersFromServer = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i]<10) {
        await getUserById(users[i])
          .then((userData) => {
            console.log(userData);
            usersFromServer.push(userData);
          })
          .catch(error => console.log(error));
      }
    }
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
          response.json({
            'error':error
          });
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