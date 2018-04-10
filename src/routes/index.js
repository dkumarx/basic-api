/*
* Route to create new user's account
* Ref: 
*     https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
*/

const express = require('express');
const router = express.Router();
const { createUserProfile } = require('../models/user-model')

/* POST User data */
router.post('/register', createUserProfile);

module.exports = router;
