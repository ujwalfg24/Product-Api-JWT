

const express = require("express");
const router = express.Router()

const {postLogin,postRegister} = require('../controller/controllers.js')



router.post('/login',postLogin)
router.post('/register',postRegister)



module.exports = router