"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

function getClient() {
  return new pg.Client({
    host:'localhost',
    port: 5432,
    database:'cadaluno',
    user:'postgres',
    password:'1234',
  });
}

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('.'))


app.get('/TrabalhoDSI', (req, res) => {
  res.status(200).send('Aplicação executando')
});

app.post('/api/aluno', (req, res) => {

  const nome = req.body.nome
  const client = getClient()
  client.connect()
  client.query("INSERT INTO aluno(id, nome, cpf, endereco) VALUES ($1, $2, $3, $4)", [id,nome, cpf, endereco], (err, item) => {
    if(err) {
      res.json(err)
      return next(err)
    } else {
      res.status(200).json("Adicionado")
    }
    client.end()
  })
})

app.get('/TrabalhoDSI', (req, res) => {

  const client = getClient()

  client.connect()

  client.query("SELECT * FROM aluno", (err, result) => {

    if(err) {
      res.json(err)
      return next(err)
    } else {
      res.status(200).json(result.rows)
    }

    client.end();
  })
})

app.listen(3000, function() {
  console.log('Servidor iniciado.')
})
