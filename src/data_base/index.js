const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries')
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/clans', db.getClans)
app.get('/clans/:id', db.getClanById)
app.post('/clans', db.createClan)
app.put('/clans/:id', db.updateClan)
app.delete('/clans/:id', db.deleteClan)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});