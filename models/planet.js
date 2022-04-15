const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: [true, "Please provide a name!"]
    }
});

module.exports = planetSchema;