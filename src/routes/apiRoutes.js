const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiControllers');
router.get('/v1/users', apiController.users);
router.get('/v1/users/:id', apiController.usersDetail);


module.exports = router;