const errorHandler = (err, req, res, next) =>
{
    //bad request
    res.status(400).json({error: err.message});
};

module.exports = errorHandler;