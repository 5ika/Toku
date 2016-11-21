# Toku

**Toku** est une application de micro-bloggage simpliste inspiré par Twitter.

Elle est composée de deux parties :

- Une API REST qui gère la base de données (MongoDB)
- Un client léger utilisant [ReactJS](https://facebook.github.io/react/) et [Alt.js](http://alt.js.org/)

![Screenshot de Toku](screenshot.png)

## Installation

### Avec Docker

Pour lancer l'application (client + API + MongoDB) facilement avec Docker, il suffit de lancer les commandes suivantes :

```sh
git clone https://github.com/5ika/Toku.git
cd Toku
docker-compose up -d
```

Une fois terminée, vous pouvez accéder au client avec l'url `http://localhost:8080`.

Pour aller plus loin, voir la documentation de [Docker](https://www.docker.com/) et de [docker-compose](https://docs.docker.com/compose/overview/).

### Par parties

Il est également possible de lancer chaque partie séparement.

#### L'API et la base de donnée

L'API permet de gérer les données et les stocker dans une base de données MongoDB.

Tout d'abord, modifiez la configuration dans `package.json` comme vous le souhaitez:

```json
...
"config": {
    "port": 7042, // Port sur lequel écoute l'API
    "delete_password": "random_password" // Mot de passe pour supprimer un poste
 }
...
```

Puis lancez les commandes suivantes :

```sh
cd server
yarn # ou `npm install`
export MONGODB_URL= mongo.example.com # FQDN de votre MongoDB (default = localhost)
node app.js
```

#### Le client

Modifiez la configuration dans `package.json` : 

```json
  ...
  "config": {
    "api": "http://<api-toku>:7042" // Remplace "<api-toku>" par l'adresse de votre API
  },
  ...
```

Puis lancez les commandes suivantes :

```shell
cd client
yarn # ou `npm install`
node_modules/.bin/grunt build
```

Une fois cela fait, le dossier `dist/` contient tous les fichiers du client. Il faut ensuite les servire par le moyen que vous voulez : NGINX, Apache,...

Pour avoir rapidement un serveur NGINX servant les fichiers, vous pouvez utiliser Docker à travers des scripts npm / yarn:

```sh
yarn run build
yarn run start # Client lancé sur le port 9090 (voir package.json)
```

##  Utilisation

Toku se veut simple et simpliste :

- Il n'y a aucune authentification. Chaque utilisateur est libre d'utiliser le nom qu'il veut.
- Le client n'a pas de dépendances externes. Ainsi, il peut être utilisé dans un réseau local non connecté à Internet.
- Le client est *responsive*. Il s'adapte à toute taille d'écran.
- Les postes sont des messages de 140 caractères maximum pouvant contenir une image.
- Chaque *poste* est parsé pour mettre en valeur les **#hashtag**, **@at** et **émoticones :-)**.
- Les postes peuvent être supprimés uniquement par ceux qui connaissent le mot de passe configuré sur l'API.