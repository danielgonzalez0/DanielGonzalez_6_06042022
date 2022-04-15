# HOT TAKES backend

## Installation

Après avoir cloner ce repo, placer vous dans le répertoire backend et utiliser la commande `npm install` dans le terminal pour installer les dépendances de package.json

Créer un fichier .env pour mettre à jour les variables d'environnement (port + accès base de données).
Vous pouvez reprendre le fichier `.env example` et remplacer les X par vos variables

## Usage

Placer vous dans le répertoire backend et utiliser la commande `npm start` pour lancer le backend en local.

L"application utilise Nodemon et le serveur se relancera automatiquement à chaque changement dans le code.

Utiliser `Ctrl+C` dans le terminal pour arrêter le serveur.

## créartion du répertoire images

Le répertoire images se trouve pas de le repo, veuillez le créer à la racine du répertoire backend (`Images`).

## base de données mongoDB

le serveur est connecté à une base de données mongoDB, il vous faudra créer une base ou vous connecter à la votre.
Le projet utilise un cluster gratuit.

VOici un lien pour créer un cluster: https://www.youtube.com/watch?v=BvZA9Yb_FKE

Dans l'onglet Network Access, cliquer sur Add IP Adress et autoriser l'accès depuis n'importe où (Add access from Anywhere).

Pour connecter l'API à votre base mongoDB, il vous faudra créer un fichier .env et remplir les variables d'environnement.

Pour récupérer les variables depuis MongoDB Atlas, cliquez sur le bouton Connect et choisissez Connect your application. Sélectionnez bien la version la plus récente du driver Node.js, puis Connection String Only.

la chaine de caractère contiendra les variables nom du cluster et nom de la base de données
Vous devrez aussi mettre votre ID et votre mot de passe défini plus tôt.

Voici le code où sont utilisées les variables dans le fichier database.js

`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,

## authentification

Les routes sont protégées par un token d'authentification.
Pour vérifier si l'utilisateur est autorisé ou non, il faudra que vous définissiez votre clé secrète dans les variables d'environnement (`JWT_SECRET_KEY`).
