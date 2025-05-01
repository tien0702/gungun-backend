const router = require('express').Router();
const userController = require('../controller/userController');

router.patch('/update/:userId', userController.update);

module.exports = router;