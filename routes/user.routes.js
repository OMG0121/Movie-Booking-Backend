const express = require('express');
const {signUp, login, logout, getCouponCode, bookShow} = require('../controllers/user.controller');

const router = express.Router();

router.post('/auth/signup', signUp);

router.post('/auth/login', login);

router.post('/auth/logout', logout);

router.get('/getCouponCode', getCouponCode);

router.get('/bookShow', bookShow);

module.exports = router;