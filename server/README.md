API REST pour gérer les données de l'application Toku.

# API

- `GET /` : Obtenir tous les postes
- `GET /last/:number` : Obtenir les `:number` derniers postes
- `GET /:id  `: Obtenir le poste correspondant à l'id `:id`,
- `POST / `: Ajouter un nouveau poste
- `PUT /:id` : Modifier le poste correspondant à l'id `:id`
- `PUT /up/:id` : Upvote / Like le poste correspondant à l'id `:id`
- `PUT /down/:id` : Downvote le poste correspondant à l'id `:id`
- `DELETE /:id` : Supprime le poste correspondant à l'id `:id`. Notez qu'il est nécessaire de fournir le mot de passe configuré.


