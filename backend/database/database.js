//mongodb+srv://Hot_Takes:<password>@oc-projet-piiquante.9x5hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//importer le package pour utiliser les variables d'environnement
require('dotenv').config();

//importer mongoose pour se connecter à la base de données MongoDB
const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@oc-projet-piiquante.9x5hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//exportation mongoose
module.exports = mongoose;
