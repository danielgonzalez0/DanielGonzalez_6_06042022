//====================================================================
//importation du framwork express

const express = require('express');

//====================================================================
//Création du router

const router = express.Router();

//====================================================================
//Importation des middlewares d'authentification et de gestion des fichiers

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//====================================================================
//Importation des controllers

const sauceCtrl = require('../controllers/sauce');
const likeCtrl = require('../controllers/like');

//====================================================================
//Création des routes

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, likeCtrl.likeSauce);

//====================================================================
//exportation du router

module.exports = router;
