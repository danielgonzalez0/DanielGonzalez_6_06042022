//importer le package HTTP de Node.js pour avoir les outils pour créer le serveur
const http = require('http');
// importation de l'application app.js pour gérer les requêtes envoyées vers le serveur
const app = require('./app');
//importer le package pour utiliser les variables d'environnement
require('dotenv').config();
