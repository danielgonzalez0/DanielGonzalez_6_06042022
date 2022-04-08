//====================================================================
//                      importation Package

//importation du framwork express
const express = require('express');
//importation de morgan (loggor HTTP)
const morgan = require('morgan');
//importation connexion base de données MongoDB
const mongoose = require('./database/database');

//====================================================================
//importation des routeurs

const userRoutes = require('./routes/user');

//====================================================================
//               création de l'application express
const app = express();

//===================================================================
//           déclaration middlewares généraux

//loguer les requests et les responses
app.use(morgan('dev'));

//Accéder au body des requêtes dans les middlewares (req.body)
app.use(express.json());

//mise en place des headers pour éviter bloquant du CORS
//CORS = Cross Origin Resource Sharing => système de sécurité qui bloque les appels HTTP entre des serveurs différents.

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//====================================================================
//configuration des routes

app.use('/api/auth', userRoutes);

//====================================================================

// exportation application express pour les autres modules
module.exports = app;
