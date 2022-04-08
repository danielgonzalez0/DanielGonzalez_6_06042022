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
const sauceRoutes = require('./routes/sauce');

//====================================================================
//Importation du module "path" pour gérer chemin des fichiers
const path = require('path');

//====================================================================
//               création de l'application express
const app = express();

//===================================================================
//           déclaration middlewares généraux

//loguer les requests et les responses
app.use(morgan('dev'));

//mise en place debuger mongoose
mongoose.set('debug', true);

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
app.use('/api/sauces', sauceRoutes);

//====================================================================
//configuration route d'accès aux images du dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

//====================================================================

// exportation application express pour les autres modules
module.exports = app;
