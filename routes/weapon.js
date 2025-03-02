const router = require('express').Router();
const weaponController = require('../controller/weaponController');

router.post('/addWeapon', weaponController.addWeapon);
router.get('/getAllWeapons', weaponController.getAllWeapons);

module.exports = router;