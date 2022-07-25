const express = require('express')
const router = express.Router()

const user_save_handler = require('../../router_handler/user_fill/user_save')

router.post('/temp-save', user_save_handler.user_save_sub)
router.post('/show-temp-save', user_save_handler.user_save_show)

module.exports = router