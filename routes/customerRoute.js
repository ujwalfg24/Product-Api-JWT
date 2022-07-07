const express = require("express");
const router = express.Router()

const {postLogin,postRegister,getProducts} = require('../controller/customerControllers')



router.post('/login',postLogin)
router.post('/register',postRegister)
router.get('/product',getProducts)


module.exports = router