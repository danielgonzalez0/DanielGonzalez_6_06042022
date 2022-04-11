//config middleware d'authentification pour protéger les routes

//====================================================================
//                      importation Package

//importation jsonwebtoken
const jwt = require('jsonwebtoken');

//importer le package pour utiliser les variables d'environnement
require('dotenv').config();

//====================================================================
//                      structure du middleware

module.exports = (req, res, next) => {
  try {
    //récupération du token autorisé dans headers + split pour enlever bearer
    const token = req.headers.authorization.split(' ')[1];
    //décoder le token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //récupération du userId du token décodé
    const userId = decodedToken.userId;
    //Ajout userId du token décodé dans requête d’authentification
    //pour le cas ou pas de userId dans la requête (ex route delete)
    req.auth = { userId };
    //vérifier si userId de la requête correspond au userId autorisé
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valide!';
    } else {
      next();
    } //end try
  } catch {
    res.status(403).json({ error: error | 'unauthorized request' });
  } //end catch
}; //end middleware authentification
