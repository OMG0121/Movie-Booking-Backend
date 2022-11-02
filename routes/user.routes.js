const express = require('express');
const {signUp, login, logout, getCouponCode, bookShow} = require('../controllers/user.controller');

const router = express.Router();

router.post('/api/auth/signup', signUp);

router.post('/api/auth/login', login);

router.post('/api/auth/logout', logout);

router.get('/api/getCouponCode', getCouponCode);

router.get('/api/bookShow', bookShow);

module.exports = router;