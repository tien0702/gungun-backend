const router = require('express').Router();
const equipmentController = require('../controller/equipmentController');

router.post('/addEquipment', equipmentController.addEquipment);
router.get('/getAllEquipments', equipmentController.getAllEquipments);

module.exports = router;