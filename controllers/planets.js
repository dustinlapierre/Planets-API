const Planet = require("../models/planet");

const getAllPlanets = async (req, res) =>
{
    const {name, hasRings, sort, fields} = req.query;
    const query = {};

    //build query object
    if(hasRings)
    {
        query.hasRings = hasRings === "true" ? true : false;
    }
    if(name)
    {
        //case insensitive
        query.name = {$regex: name, $options: 'i'};
    }

    //do query
    let result = Planet.find(query);

    //sorting flags
    if(sort)
    {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    }
    if(fields)
    {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }
    const planets = await result;

    res.status(200).json({planets});
};

module.exports = getAllPlanets;