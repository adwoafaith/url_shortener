const express = require('express')
const router = express.Router()
const controller = require('../controller/myurl')

router.get ('/home',controller.homePage)
router.post ('/save',controller.saveUrl)
router.post('/find',controller.findUrl)


module.exports = router;