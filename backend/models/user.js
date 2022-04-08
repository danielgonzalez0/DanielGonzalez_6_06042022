//========================================================
//         importaion moongoose et unique-validator

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//=======================================================
//         création du schéma de données

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}); // end schéma user

//=========================================================
//plugin supplémentaire pour sécuriser mail unique dans base mongoDB

userSchema.plugin(uniqueValidator);

//=========================================================
//        exportation du schéma de données

module.exports = mongoose.model('User', userSchema);
