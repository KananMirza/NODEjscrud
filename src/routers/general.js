const router =  require('express').Router();
const generalController = require("../controller/general");
const authmiddleware = require("../middleware/authmiddleware")

router.get("/isci-getir",generalController.isciGetir);
router.get("/isci-getir-email",generalController.isciGetirEmail);
router.delete('/isci-sil',generalController.isciSil);
router.post('/isci-elave',generalController.isciElave);
router.put('/isci-redakte',generalController.isciRedakte);
router.post('/login',generalController.login);
router.get('/me',authmiddleware,generalController.myData);

module.exports = router;