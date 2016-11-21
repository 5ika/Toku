Le client utilise le template d'application https://github.com/5ika/Grunt-Docker. 

## Initialisation

Il est conseillé d'utiliser le gestionnaire de modules NodeJS appelé [Yarn](https://yarnpkg.com/). Cependant, toutes les commandes Yarn peuvent être également faites avec NPM.

```bash
git clone https://github.com/5ika/Grunt-Docker mon-app
cd mon-app
yarn
grunt
```

Par défaut, `grunt` lance un serveur [BrowserSync](https://browsersync.io) qui sert les fichiers du dossier `dist/` et ouvre une fenêtre du navigateur (port 3000).

## Structure

```bash
src/
	js/
		app.js # Fichier JS principal, utilisé par Browserify
	scss/
		app.scss # Fichier SCSS principal, utilisé par Node-Sass
	views/
		headers/
			default.pug	# Header par défaut des pages HTML
			index.pug # Page par défaut
	statics/	# Contient les fichiers statiques (images, fonts..)
```

## Commandes Grunt

- `grunt` : Compile tous les fichiers, lance BrowserSync et écoute les changements
- `grunt:build`: Compile tous les fichiers
- `grunt clean` : Supprime tous les fichiers de compilation et les modules installés
  - `grunt clean:dist` : Supprime juste les fichiers compilés

## Utilisation

### Javascript

Grunt utilise le fichier `src/js/app.js` comme point de départ. Vous pouvez utiliser d'autres fichiers en faisant des `require` qui seront interprétés par [Browserify](http://browserify.org/). Tous les fichiers `.js` passent à travers un compilateur [Babel](https://babeljs.io/) qui convertit les scripts ES6 et JSX en language interprétable par un navigateur.

### Sass

De la même manière que le Javascript, Grunt utilise le fichier `src/scss/app.scss` comme point de départ pour les feuilles de styles. Dans ce fichier, vous pouvez importer d'autres feuilles de styles.

### Views

Tous les fichiers `*.pug` à la racine du dossier `src/views` seront compiler en fichiers html et placer dans le dossier `dist/` par le compilateur [Pug](https://github.com/pugjs/pug). Vous pouvez utiliser des templates ou des pages partielles en faisant des sous-dossiers.

### Statics

Tous les fichiers et dossiers placés dans `src/statics` seront copier dans `dist`. Cela est utile notamment pour les images ou  les fichiers de font.



Lorsque vous modifier un fichier dans `src`, il sera automatiquement compiler comme il le faut et placer dans `dist`. Ce dossier contient ainsi l'ensemble de votre application compilée.

## Lancement avec Docker

Pour lancer facilement votre application avec [Docker](https://www.docker.com/), vous pouvez utiliser les raccourcis suivant :

- `yarn run build` : Construit une image contenant un serveur NGINX et vos fichiers compilés.
- `yarn run start` : Lance un container en local. Vous pouvez accéder à votre application sur `localhost:9090`. Il est possible de changer le port dans le fichier `package.json`.
- `yarn run stop` : Supprime le container.
- `yarn run clean` : Supprime l'image et éventuellement le container s'il est lancé.

> Il est nécessaire que Docker soit installé sur votre système
