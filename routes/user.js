const router = require('express').Router();
const userController = require('../controller/userController');

router.patch('/update/:userId', userController.update);
router.get('/get/:userId', userController.getUser);

module.exports = router;