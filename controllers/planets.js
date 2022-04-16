const Planet = require("../models/planet");

const getAllPlanets = async (req, res) =>
{
    const {name, hasRings} = req.query;
    const query = {};
    if(hasRings)
    {
        query.hasRings = hasRings === "true" ? true : false;
    }
    if(name)
    {
        //case insensitive
        query.name = {$regex: name, $options: 'i'};
    }

    console.log(query);
    const planets = await Planet.find(query);
    res.status(200).json({planets});
};

module.exports = getAllPlanets;