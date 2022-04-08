//==========================================================================
// définition des logiques métier des middleware sauce

//==========================================================================
// importation modules et packages

// importation du schéma de données
const Sauce = require('../models/sauce');
// importation du module fs pour interagir avec le système de fichiers
const fs = require('fs');

//==========================================================================
//middleware

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  });

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
//middleware

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

//==========================================================================
//middleware

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//==========================================================================
//middleware

exports.modifySauce = (req, res, next) => {
  //test si image ou non dans Put
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
    .catch((error) => res.status(400).json({ error }));
};

//==========================================================================
//middleware

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({ error: 'Sauce non trouvée!' });
    } //end if objet non trouvé
    if (sauce.userId !== req.auth.userId) {
      return res.status(401).json({ error: 'Requête non autorisée!' });
    } // end if ID différent
    // suppression image dans /images/
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée' }))
            .catch((error) => res.status(400).json({ error }));
        }); //end unlink
      }) //end then suppression image
      .catch((error) => res.status(500).json({ error }));
  }); //end then findOne
}; //end controller delete