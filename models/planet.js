const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
    name: String,
    mass:
    {
        value: Number,
        unit: String
    },
    diameter:
    {
        value: Number,
        unit: String
    },
    density:
    {
        value: Number,
        unit: String
    },
    gravity:
    {
        value: Number,
        unit: String
    },
    distanceFromSun:
    {
        value: Number,
        unit: String
    },
    avgTemp:
    {
        value: Number,
        unit: String
    },
    numberOfMoons: Number,
    hasRings: Boolean

});

module.exports = mongoose.model("Planet", planetSchema);