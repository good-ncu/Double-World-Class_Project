const express = require('express')
const router = express.Router()

const gov_review_del_handler = require('../../router_handler/query/gov-review-del')

router.post('/delete-school-data', gov_review_del_handler.delete_school_data)

module.exports = router