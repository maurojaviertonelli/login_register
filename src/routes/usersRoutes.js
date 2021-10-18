const express = require('express');
const { get } = require('jquery');
const router = express.Router();

const usersControllers = require('../controllers/usersControllers')

router.get('/login',usersControllers.login)
router.post('/login',usersControllers.loginProcess)
//register routes
router.get('/register',usersControllers.register)
router.post('/register',usersControllers.registerPost)
//profile routes
router.get('/profile',usersControllers.profile);
//router.get('/create',usersControllers.create);
//router.post('/create',usersControllers.createPost);
//--logout--//
router.get('/logout',usersControllers.logout);
// edit routes //
router.get('/editUser',usersControllers.edit);
router.put('/editUser',usersControllers.editPut);

module.exports=router
