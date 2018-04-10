/*
*   Users Model declaration
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { handleError } = require('../handleErrors')

// Define User schema
const userSchema = new Schema({
    firstName: {type: String, required: true, maxlength: 50},
    middleName: {type: String, required: false, maxlength: 20},
    lastName: {type: String, required: true, maxlength: 30},
    email: {type: String, required: true},
    createdDateTime: { type: Date, default: Date.now },
    status: {type: Boolean, default: false}
})

// Complie model from schema
const UserModel = mongoose.model('UserModel', userSchema)

// GET all user profile
module.exports.findUser = (req, res, next) => {
    let searchRegEx = new RegExp(req.query.searchTerm,'i');
    UserModel.find({'firstName': { $regex: searchRegEx}},  {__v: 0}, (err, data) =>{
        if (err) return handleError(err);
        res.status(200)
        res.setHeader('Content-Type', 'application/json');
        res.send({res: 1, data: data});
    })  
}

// GET all user profile
module.exports.getAllUsers = (req, res, next) => {
    UserModel.find({}, {__v: 0}, (err, data) =>{
        if (err) return handleError(err);
        res.status(200)
        res.setHeader('Content-Type', 'application/json');
        res.send({res: 1, data: data});
    })  
}

// CREATE user profile
module.exports.createUserProfile = (req, res, next) => {
    req.body['createdDateTime'] = new Date; 
    UserModel.create(req.body, (err, data) => {
        if (err) return handleError(err, res);
        res.status(200)
        res.setHeader('Content-Type', 'application/json');
        res.send({res: 1, data: data});
    })
}