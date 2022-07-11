const express = require('express')
const router = express.Router()

const home_handler = require('../../router_handler/query/home')
 
router.post('/home', home_handler.query_show)

module.exports = router