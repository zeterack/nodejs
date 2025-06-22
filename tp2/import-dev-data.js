import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Tour } from './models/tour.model.js';

dotenv.config();

// Connection à la base de données
const DATABASE = process.env.DATABASE;

const connectString = DATABASE;

mongoose.connect(connectString)
    .then(() => {
        console.log("Connection to MongoDB has succeeded !!");
    })
    .catch((err) => {
        console.log("Connection to MongoDB has failed", err);
    });

// Lecture du fichier JSON
const tours = JSON.parse(fs.readFileSync(`${process.cwd()}/dev-data/data/tours-simple.json`, 'utf-8'));

// Fonction pour importer les données
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// Fonction pour supprimer les données
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// Exécuter le script en fonction de l'argument passé
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
} else {
    console.log('Usage: node import-dev-data.js --import | --delete');
    process.exit();
}
