/*
*   Message/Pokes Model declaration
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { handleError } = require('../handleErrors')

// Define Message schema
const pokeSchema = new Schema({
    from: {type: Schema.Types.ObjectId, required: true},
    to: {type: Schema.Types.ObjectId, required: true},
    type: {type: String, default:"message"}, // This can be either poke/ type: message
    message: {type: String, required: true, maxlength: 100},
    pairIDs: {type: String},
    createdDate: { type: Date, default: Date.now }
})

// Complie model from schema
const PokeModel = mongoose.model('PokeModel', pokeSchema)

// GET all pokes
module.exports.fetchAllPokes = (req, res, next) => {
    PokeModel.find({}, {pairIDs:0, __v:0}, (err, data) =>{
        if (err) return handleError(err);
        res.status(200)
        res.setHeader('Content-Type', 'application/json');
        res.send({res: 1, data: data});
    })  
}

/*
* GET pokes by ID; system need from and to users id to established connection
*   Params:
*       _id: default id (From)
*        to: To user (message to be send)
*/
module.exports.fetchPokesById = (req, res, next) => {
    const searchById = `${req.params._id}-${req.params.to}`;
    PokeModel.find({'pairIDs': searchById}, {pairIDs:0, __v:0}, (err, data) =>{
        if (err) return handleError(err);
        res.status(200)
        res.setHeader('Content-Type', 'application/json');
        res.send({res: 1, data: data});
    })  
}

/*
* CREATE: message and send to user
*   Added pairIDs to get messages filtered by from and to user's ids
*   Parmameters:
*       _id (default id where the user initiate message to another user's to estiablish connection and send message
*/
module.exports.sendPokes = (req, res, next) => {
    const _pairId = (req.params._id < req.body.to) ? `${req.params._id}-${req.body.to}` : `${req.body.to}-${req.params._id}`;
    req.body['pairIDs'] = _pairId;
    req.body['createdDateTime'] = new Date;
    PokeModel.create(req.body, (err, data) => {
        if (err) return handleError(err, res);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send({res: 1, data: data});
    })
}