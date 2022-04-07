//===========================================================================================
//                      importation Package

//importer le package pour utiliser les variables d'environnement
require('dotenv').config();

//importer mongoose pour se connecter à la base de données MongoDB
const mongoose = require('mongoose');

//===========================================================================================
//                    connexion à la base de données MongoDB

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//exportation mongoose
module.exports = mongoose;
