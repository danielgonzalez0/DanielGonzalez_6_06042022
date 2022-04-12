//==========================================================================
// définition des logiques métier du système de like

//==========================================================================
// importation modules et packages

// importation du schéma de données
const Like = require('../models/sauce');

//==========================================================================
//middleware création d'une nouvelle instance sauce

exports.likeSauce = (req, res, next) => {
  console.log('je suis dans le controler like');

  //affichage du body
  /*la requête like
  format objet JSON à envoyer dans le body de la requête
  { "userId": "xxxxxxxxxxxxxxxxxxxxxxxxx",
"like" : "1"}
  */
  console.log('--------req.body du ctrl like--------');
  console.log(req.body);
  console.log(req.body.userId);
  console.log(typeof req.body.userId);
  console.log(typeof req.body.like);
  //récupérer l'Id dans l'url de la requête

  console.log('--------req.params du ctrl like--------');
  console.log(req.params.id);

  //mise en forme id vers format mongoDB _id
  console.log('--------ctrl like: id vers _id--------');
  const likeId = { _id: req.params.id };
  console.log(likeId);

  //aller chercher la sauce dans mongoDB
  Like.findOne({ _id: req.params.id })
    .then((sauce) => {
      console.log(
        '--------ctrl like: contenu du résultat promise sauce--------'
      );
      console.log(sauce);
      console.log(sauce.userLiked.includes(req.body.userId));
      console.log(parseInt(req.body.like) === 1);
      // like = 1 (likes = +1)
      //--> utilisation de la méthode includes()
      //--> utilisation de l'opérateur $inc (mongoDB)
      //--> utilisation de l'opérateur $push (mongoDB)
      //--> utilisation de l'opérateur $pull (mongoDB)

      //mise en place logique du like
      // si userId inclut dans userLiked = false et si like === 1
      if (
        !sauce.userLiked.includes(req.body.userId) &&
        parseInt(req.body.like) === 1
      ) {
        console.log(
          "---> userId n'est pas dans array userLiked et req front like = 1 "
        );

        // mise à jour BDD

        Like.updateOne(
          { _id: req.params.id },
          { $inc: { likes: 1 }, $push: { userLiked: req.body.userId } }
        ) //end updateone
          .then(() => res.status(201).json({ message: 'sauce like +1' }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        console.log('conditions false');
      } //end if


    })
    .catch((error) => res.status(404).json({ error }));
  //end catch

  // like = 0 (likes = 0, pas de vote)

  // like = -1 (dislikes = +1)

  // like = 0 (dislikes = 0)
}; //end fonction like
