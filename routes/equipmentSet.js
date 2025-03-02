const router = require('express').Router();
const equipmentSetController = require('../controller/equimentSetController');

router.post('/addEquipmentSet', equipmentSetController.addEquipmentSet);
router.get('/getAllEquipmentSets', equipmentSetController.getAllEquipmentSets);

module.exports = router;