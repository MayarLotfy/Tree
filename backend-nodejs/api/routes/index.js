var express = require('express'),
router = express.Router(),
TreeController = require('../controllers/TreeController'),
InfoController = require('../controllers/InfoController');


//-------------------------------Tree Routes-----------------------------------
router.get('/node/getNodes' , TreeController.getNodes);
router.get('/node/getNode/:NodeId' , TreeController.getNode);


router.post('/node/createNode', TreeController.createNode);
router.patch('/node/updateNode/:nodeId' , TreeController.updateNode);
router.delete('/node/deleteNode/:productId' , TreeController.deleteNode);


//--------------------------------Info Routes-----------------
router.get('/info/getParentsInfo/:nodeName', InfoController.getParentInfo);
router.get('/info/getChildrenInfo/:nodeName', InfoController.getChildrenInfo);

module.exports = router;
