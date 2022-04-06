//importer le package HTTP de Node.js pour avoir les outils pour créer le serveur
const http = require('http');
// importation de l'application app.js pour gérer les requêtes envoyées vers le serveur
const app = require('./app');
//importer le package pour utiliser les variables d'environnement
require('dotenv').config();

//------------------------------------------------------------------------------------------
// fonction normalizePort => renvoie un port valide => number ou string
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
//-----------------------------------------------------------------------------------------
// fonction errorHandler => gestion des erreurs connexion serveur
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
//-----------------------------------------------------------------------------------------
//paramétrage du part avec méthode set d'express
const port = normalizePort(process.env.PORT);
app.set('port', port);

//----------------------------------------------------------------------------------------
//création du serveur
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
