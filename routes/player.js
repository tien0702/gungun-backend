const router = require('express').Router();
const playerController = require('../controller/playerController');

router.get('/getPlayer', playerController.getPlayer);
router.post('/currencyFlow', playerController.currencyFlow);
router.post('/collectWeapon', playerController.collectWeapon);
router.post('/collectEquipment', playerController.collectEquipment);
router.post('/addExpWeapon', playerController.addExpWeapon);
router.post('/addExpEquipment', playerController.addExpEquipment);

module.exports = router;