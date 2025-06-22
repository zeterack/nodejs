# API Tours - Natours

Cette API REST a été développée avec Node.js, Express et MongoDB pour gérer une base de données de tours touristiques.

## Prérequis

- Node.js
- MongoDB (local ou MongoDB Atlas)
- npm

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Créez un fichier `.env` à la racine du projet avec les variables suivantes :
   ```
   LOCAL_DATABASE=mongodb://localhost:27017/natours
   PASSWORD=votre_mot_de_passe_mongodb_atlas
   DATABASE=mongodb+srv://votre_username:<PASSWORD>@cluster.mongodb.net/natours?retryWrites=true&w=majority&appName=Cluster0
   PORT=3000
   ```

## Importation des données de test

Pour importer les données de test dans la base de données :

```bash
node import-dev-data.js --import
```

Pour supprimer toutes les données :

```bash
node import-dev-data.js --delete
```

## Démarrage du serveur

```bash
node server.js
```

## Endpoints API

### Tours

- `GET /api/v1/tours` - Obtenir tous les tours
- `GET /api/v1/tours/:id` - Obtenir un tour spécifique
- `POST /api/v1/tours` - Créer un nouveau tour
- `PATCH /api/v1/tours/:id` - Mettre à jour un tour
- `DELETE /api/v1/tours/:id` - Supprimer un tour

### Fonctionnalités spéciales

- `GET /api/v1/tours/top-5-cheap` - Obtenir les 5 meilleurs tours triés par note et prix
- `GET /api/v1/tours/tour-stats` - Obtenir des statistiques sur les tours
- `GET /api/v1/tours/monthly-plan/:year` - Obtenir un plan mensuel des tours pour une année spécifique

### Filtrage, tri et pagination

L'API prend en charge les fonctionnalités de filtrage avancé :

- Filtrage : `GET /api/v1/tours?duration=5&difficulty=easy`
- Filtrage avec opérateurs : `GET /api/v1/tours?duration[gte]=5&difficulty=easy`
- Tri : `GET /api/v1/tours?sort=price,ratingsAverage`
- Limitation des champs : `GET /api/v1/tours?fields=name,duration,price`
- Pagination : `GET /api/v1/tours?page=1&limit=3`

## Modèle de données

Le modèle de tour comprend les champs suivants :

- `name` : Nom du tour (obligatoire, unique)
- `duration` : Durée du tour en jours (obligatoire)
- `maxGroupSize` : Taille maximale du groupe (obligatoire)
- `difficulty` : Niveau de difficulté (obligatoire)
- `ratingsAverage` : Note moyenne (par défaut : 4.5)
- `ratingsQuantity` : Nombre de notes (par défaut : 0)
- `price` : Prix du tour (obligatoire)
- `priceDiscount` : Remise sur le prix
- `summary` : Résumé du tour (obligatoire)
- `description` : Description détaillée
- `imageCover` : Image de couverture (obligatoire)
- `images` : Liste d'images
- `createAt` : Date de création
- `startDates` : Liste des dates de départ

## Technologies utilisées

- Node.js
- Express
- MongoDB
- Mongoose
