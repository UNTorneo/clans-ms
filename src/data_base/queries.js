const { request, response } = require('express');

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'api',
  password: 'bedoya2501',
  port: 5432,
});

const getClans = (request, response) => {
    pool.query('SELECT * FROM clans ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getClanById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM clans WHERE id = $1', [id], (error, results) =>{
        if (eror) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const createClan = (request, response) => {
  const name = request.body;
  const date = new Date;
  const created_at = date.setFullYear.toString + date.getMonth.toString + date.getDay.toString;

  pool.query('INSERT INTO clans (name, created_at) VALUES ($1, $2) RETURNING *', [name, created_at], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  });
}

const updateClan = (request, response) => {
  const id = parseInt(request.params.id);
  const name = request.body;

  pool.query(
    'UPDATE clans SET name = $1 WHERE id = $3',
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
}

const deleteClan = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM clans WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Clan deleted with id = ${id}`);
    });
}

module.exports = {
    getClanById,
    getClans,
    createClan,
    updateClan,
    deleteClan
};