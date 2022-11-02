const express = require('express');
const {signUp, login, logout} = require('../controllers/user.controller');

const router = express.Router();

router.post('/auth/signup', signUp);

router.post('/auth/login', login);

router.post('/auth/logout', logout);

module.exports = router;