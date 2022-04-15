const Planet = require("../models/planet");

const getAllPlanets = async (req, res) =>
{
    const planets = await Planet.find({});
    res.status(200).json({planets});
};

module.exports = getAllPlanets;