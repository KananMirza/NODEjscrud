const router =  require('express').Router();
const generalController = require("../controller/general");

router.get("/isci-getir",generalController.isciGetir);
router.get("/isci-getir-email",generalController.isciGetirEmail);
router.delete('/isci-sil',generalController.isciSil);
router.post('/isci-elave',generalController.isciElave);
router.put('/isci-redakte',generalController.isciRedakte);
router.post('/login',generalController.login);

module.exports = router;