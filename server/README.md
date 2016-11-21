API REST pour gérer les données de l'application Toku.

# Configuration

Modifiez le fichier `package.json` selon votre convenance :

```json
...
"config": {

    "port": 7042, // Port sur lequel écoute l'API
    "delete_password": "random_password" // Mot de passe pour supprimer un poste
 }
...
```

# Lancement

## Avec Docker

```sh
docker build -t toku-api . # Construit l'image Docker
docker run --name toku-mongo -d mongo # Lance une instance de MongoDB
docker run -d -p 7042:7042 --link toku-mono:mongo -e MONGODB_URL:mongo toku-api # Lance le serveur API et le lie à MongoDB
```

Vous pouvez ensuite faire des requêtes sur `http://localhost:7042`.

## Sans Docker

```sh
yarn # ou `npm install`
node app.js
```

Si la base de données n'est pas en localhost, il est possible d'indiquer son adresse à travers la variable d'environnement `MONGODB_URL`.

*exemple :* `export MONGODB_URL=ma-mongodb.net`

# API

- `GET /` : Obtenir tous les postes
- `GET /last/:number` : Obtenir les `:number` derniers postes
- `GET /:id  `: Obtenir le poste correspondant à l'id `:id`,
- `POST / `: Ajouter un nouveau poste
- `PUT /:id` : Modifier le poste correspondant à l'id `:id`
- `PUT /up/:id` : Upvote / Like le poste correspondant à l'id `:id`
- `PUT /down/:id` : Downvote le poste correspondant à l'id `:id`
- `DELETE /:id` : Supprime le poste correspondant à l'id `:id`. Notez qu'il est nécessaire de fournir le mot de passe configuré.


