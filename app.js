require('dotenv').config();
//for simplifying error handling in async functions
//this will no longer be necessary with Express 5
require('express-async-errors');
const express = require("express");
const app = express();

//database connection
const connectDB = require("./db/connect");

app.use(express.json());

//error handlers
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

//landing page
app.use(express.static("./public"));

//router
const planetRouter = require("./routes/planets");
app.use("/api/v1", planetRouter);

//catch all for non-existing routes
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () =>
{
    //try a database connection
    try
    {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
        {
            console.log(`listening on port ${port}...`);
        });
    }
    catch(err)
    {
        console.log(err);
    }
};
start();