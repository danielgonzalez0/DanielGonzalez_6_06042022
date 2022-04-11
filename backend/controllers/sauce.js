//==========================================================================
// définition des logiques métier des middleware sauce

//==========================================================================
// importation modules et packages

// importation du schéma de données
const Sauce = require('../models/sauce');
// importation du module fs pour interagir avec le système de fichiers
const fs = require('fs');

//==========================================================================
//middleware création d'une nouvelle instance sauce

exports.createSauce = (req, res, next) => {
  //récupérer l'objet envoyé par le frontend (format form-data car image dedans)
  //tranformer l'objet qui est sous forme de chaine de caractère en objet Json
  const sauceObject = JSON.parse(req.body.sauce);
  //supprimer l'iD envoyé par le frontend avant de copier la sauce
  delete sauceObject._id;
  //création d'une nouvelle instance
  const sauce = new Sauce({
    ...sauceObject,
    //définition de l'url de l'image générée via multer
    //schéma: nom protocole + nom de l'hôte + répertoire + le nom du fichier
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    //initialisation like et dislike à 0
    likes: 0,
    dislikes: 0,
    //initialisation tableaux des users like et dislike vide
    userLiked: [],
    userDisliked: [],
  });
  //sauvegarde de la nouvelle instance dans MongoDB
  sauce
    .save()
    .then(() =>
      res.status(201).json({
        message: 'sauce enregistrée!',
      })
    )
    .catch((error) => res.status(400).json({ error: error }));
};

//==========================================================================
//middleware get => affiche toutes les sauces dans a base mongoDB

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

//==========================================================================
//middleware get => recherche une sauce en fonction du paramètre id dans la route

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//==========================================================================
//middleware put => modification d'une sauce
//2 cas de figures => avec ou sans modification d'image

exports.modifySauce = (req, res, next) => {
  //test si image a été modifié ou non dans la requête
  const sauceObject = req.file
    ? // si modification de l'image, remise à jour de l'url de l'image générée via multer
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : //si pas de modification de l'image
      { ...req.body };
  //enregistrement des modifications dans mongoDB via id de la sauce
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
    .catch((error) => res.status(400).json({ error }));
};

//==========================================================================
//middleware suppression d'un sauce

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    //test si id sauce non trouvé
    if (!sauce) {
      return res.status(404).json({ error: 'Sauce non trouvée!' });
    } //end if objet non trouvé
    //test si user Id est autorisé à supprimer la sauce => grâce user.id ajouté dans auth.js
    if (sauce.userId !== req.auth.userId) {
      return res.status(401).json({ error: 'Requête non autorisée!' });
    } // end if ID différent

    // suppression image dans /images/
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        // création constante pour récupérer le nom de l'image
        const filename = sauce.imageUrl.split('/images/')[1];
        // suppression de l’image avec méthode fs.unlink (imageàsupprimer, callback de ce qu'on fait après suppression image)
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée' }))
            .catch((error) => res.status(400).json({ error }));
        }); //end unlink
      }) //end then suppression image
      .catch((error) => res.status(500).json({ error }));
  }); //end then findOne
}; //end controller delete
