/*
* Get user profile
*/

const express = require('express');
const router = express.Router();
const { findUser } = require('../models/user-model');
const { sendPokes, fetchAllPokes, fetchPokesById } = require('../models/poke-model')

/* 
*  GET users listing.
*   API URL (Ex.): /users/search?searchTerm=test
*/
router.get('/search', findUser);

/* 
* SEND: poke to users. 
*   Source user id
*   API URL (Ex.) : /users/5ac712923316eb0e61686fbd/pokes
*/
router.post('/:_id/pokes', sendPokes);

/* 
* GET: Fetch all pokes. 
*   Source user id as _id 
*   API URL (Ex.): /users/5ac711b851e9970e5ff99328/pokes/fetch-all
*/
router.get('/:_id/pokes/fetch-all', fetchAllPokes);

/* 
* GET: Fetch pokes by user id. 
*   _id: Source user id
*    to: destination user id
*       API URL (Ex.): /users/5ac711b851e9970e5ff99328/pokes/5ac712923316eb0e61686fbd
*/
router.get('/:_id/pokes/:to', fetchPokesById);

module.exports = router;
