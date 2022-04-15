//==========================================================================
// définition des logiques métier des middleware user

//==========================================================================
// importation modules et packages

// importation du schéma de données
const User = require('../models/user');
//importation bcrypt
const bcrypt = require('bcrypt');
//importion du package dotenv pour utiliser les variables d'environnement
require('dotenv').config();
//importation jsonwebtoken pour créer/encoder des token d'authentification
const jwt = require('jsonwebtoken');

//==========================================================================
//middleware signup pour enregistrement nouveaux utilisateurs

exports.signup = (req, res, next) => {
  //hashage MDP
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      //création nouvel utilisateur
      const user = new User({
        email: req.body.email,
        password: hash,
      }); // end création new User

      //enregistrer User dans mongoDB
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' })) //end then save user
        .catch((error) => res.status(400).json({ error })); //end catch save user
    }) //end then hash
    .catch((error) => res.status(500).json({ error })); //end catch hash
}; //end middleware signup

//==========================================================================
//middleware login pour connecter les utilisateurs existants

exports.login = (req, res, next) => {
  //trouver l'utilisateur avec méthode findOne
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé!' });
      }
      // si Utilisateur trouvé, comparer le MDP requête avec MDP user avec bcrypt
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect!' });
          }
          //si mdp ok renvoie userId + un token
          res.status(200).json({
            userId: user._id, //_id => créer par MongoDB
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
              expiresIn: '24h',
            }),
          });
        }) //end then compare
        .catch((error) => res.status(500).json({ error })); //end catch compare
    }) //end then findOne
    .catch((error) => res.status(500).json({ error })); //end catchfindOne
}; //end middleware login
