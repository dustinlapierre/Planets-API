require('dotenv').config();

//run this file to populate database with data contained in planets.json

const connectDB = require('./db/connect');
const Planet = require('./models/planet');

const jsonData = require('./planets.json');

const start = async () =>
{
    try
    {
        await connectDB(process.env.MONGO_URI);
        await Planet.deleteMany();
        console.log('Successfully cleared database');
        await Planet.create(jsonData);
        console.log('Successfully loaded database from file');
        process.exit(0);
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
};

start();
