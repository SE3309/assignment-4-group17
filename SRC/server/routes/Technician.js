const express= require('express')
const router= express.Router()
const con = require("../db");
router.use(express.json())

module.exports = router;