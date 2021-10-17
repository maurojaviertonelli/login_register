const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/usersControllers')

router.get('/login',usersControllers.login)

//register routes
router.get('/register',usersControllers.register)
router.post('/register',usersControllers.registerPost)

module.exports=router
