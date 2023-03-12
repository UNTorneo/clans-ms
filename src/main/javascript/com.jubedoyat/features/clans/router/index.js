const express = require('express');
const bodyParser = require('body-parser');
const db = require('../../../../../../data_base/queries')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// cambiar arquitectura
app.get('/clans/users/:id', db.getUsersByClanId)
app.post('/clans/users/:id', db.addUserToClan)
app.put('/clans/:id', db.updateClan)
app.delete('/clans/:id', db.deleteClan)
app.get('/clans/:id', db.getClanById)
app.get('/clans', db.getClans)
app.post('/clans', db.createClan)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});