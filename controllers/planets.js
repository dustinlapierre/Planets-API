const Planet = require("../models/planet");

const getAllPlanets = async (req, res) =>
{
    const {name, hasRings, sort, fields, numericFilters} = req.query;
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
    //mathematic filters for number fields
    if(numericFilters)
    {
        const operatorMap =
        {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
        };

        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
        const options = ['mass', 'diameter', 'density', 'gravity', 'distanceFromSun', 'avgTemp', 'numberOfMoons'];
        filters = filters.split(',').forEach((item) =>
        {
            const [field, operator, value] = item.split('-');
            if(options.includes(field))
            {
                if(field != "numberOfMoons")
                {
                    //numeric values are nested inside the field under value {value: x, unit: 'y'}
                    const nestedField = field + ".value";
                    //must use computed property name or the key would literally be "operator"
                    query[nestedField] = {[operator]: Number(value)};
                }
                else
                {
                    query[field] = {[operator]: Number(value)};
                }
            }
        });
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