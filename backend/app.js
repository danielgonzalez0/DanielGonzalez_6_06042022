//importation du framwork express
const express = require('express');
//création de l'application express
const app = express();
//importation connexion base de données MongoDB
const mongoose = require('./database/database');

// exportation application express pour les autres modules
module.exports = app;
