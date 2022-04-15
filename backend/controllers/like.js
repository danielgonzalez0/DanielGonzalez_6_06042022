//==========================================================================
// définition des logiques métier du système de like

//==========================================================================
// importation modules et packages

// importation du schéma de données
const Like = require('../models/sauce');

//==========================================================================
//middleware système de like

exports.likeSauce = (req, res, next) => {
  // défintion des variables:
  const likeNumber = parseInt(req.body.like);
  const userIdInReq = req.body.userId;

  //récupérer l'Id dans l'url de la requête + aller chercher la sauce dans mongoDB
  Like.findOne({ _id: req.params.id })
    .then(
      (sauce) => {
        const userIdInUserLiked = sauce.userLiked.includes(userIdInReq);
        const userIdInUserDisliked = sauce.userDisliked.includes(userIdInReq);

        switch (likeNumber) {
          //==================================================================================
          case 1:
            console.log('je suis dans le cas 1');
            if (!userIdInUserLiked && !userIdInUserDisliked) {
              // mise à jour BDD
              Like.updateOne(
                { _id: req.params.id },
                { $inc: { likes: 1 }, $push: { userLiked: userIdInReq } }
              ) //end updateone
                .then(() => res.status(201).json({ message: 'sauce like +1' }))
                .catch((error) => res.status(400).json({ error }));
            } // end if
            //-------------------------------------------------------------------------------
            if (!userIdInUserLiked && userIdInUserDisliked) {
              // mise à jour BDD
              Like.updateOne(
                { _id: req.params.id },
                {
                  $inc: { likes: 1, dislikes: -1 },
                  $push: { userLiked: userIdInReq },
                  $pull: { userDisliked: userIdInReq },
                }
              ) //end updateone
                .then(() => res.status(201).json({ message: 'sauce like +1' }))
                .catch((error) => res.status(400).json({ error }));
            } // end if

            //-------------------------------------------------------------------------------
            if (userIdInUserLiked && !userIdInUserDisliked) {
              // mise à jour BDD
              Like.updateOne(
                { _id: req.params.id },
                {
                  $inc: { likes: 0 },
                }
              ) //end updateone
                .then(() => res.status(201).json({ message: 'sauce like +1' }))
                .catch((error) => res.status(400).json({ error }));
            } // end if

            break; // end case 1
          //==================================================================================
          case 0:
            console.log('je suis dans le cas 0');
            if (userIdInUserLiked && !userIdInUserDisliked) {
              // mise à jour BDD
              Like.updateOne(
                { _id: req.params.id },
                {
                  $inc: { likes: -1 },
                  $pull: { userLiked: userIdInReq },
                }
              ) //end updateone
                .then(() => res.status(201).json({ message: 'sauce like 0' }))
                .catch((error) => res.status(400).json({ error }));
            } // end if
            //-------------------------------------------------------------------------------
            if (!userIdInUserLiked && userIdInUserDisliked) {
              // mise à jour BDD
              Like.updateOne(
                { _id: req.params.id },
                {
                  $inc: { dislikes: -1 },
                  $pull: { userDisliked: userIdInReq },
                }
              ) //end updateone
                .then(() => res.status(201).json({ message: 'sauce like 0' }))
                .catch((error) => res.status(400).json({ error }));
            } // end if

            break; // end case 0
          //==================================================================================
          case -1:
            console.log('je suis dans le cas -1');
            if (!userIdInUserLiked && !userIdInUserDisliked) {
              // mise à jour BDD
              Like.updateOne(
                { _id: req.params.id },
                { $inc: { dislikes: 1 }, $push: { userDisliked: userIdInReq } }
              ) //end updateone
                .then(() => res.status(201).json({ message: 'sauce like -1' }))
                .catch((error) => res.status(400).json({ error }));
            } // end if
            //-------------------------------------------------------------------------------
            if (userIdInUserLiked && !userIdInUserDisliked) {
              // mise à jour BDD
              Like.updateOne(
                { _id: req.params.id },
                {
                  $inc: { likes: -1, dislikes: 1 },
                  $pull: { userLiked: userIdInReq },
                  $push: { userDisliked: userIdInReq },
                }
              ) //end updateone
                .then(() => res.status(201).json({ message: 'sauce like -1' }))
                .catch((error) => res.status(400).json({ error }));
            } // end if
            //-------------------------------------------------------------------------------
            if (!userIdInUserLiked && userIdInUserDisliked) {
              // mise à jour BDD
              Like.updateOne(
                { _id: req.params.id },
                {
                  $inc: { dislikes: 0 },
                }
              ) //end updateone
                .then(() => res.status(201).json({ message: 'sauce like -1' }))
                .catch((error) => res.status(400).json({ error }));
            } // end if
            break;

          // end case -1
          //==================================================================================
        } //end switch
      } //end findone
    ) // end then likeSauce
    .catch((error) => res.status(404).json({ error }));
  //end catch
}; //end fonction like
