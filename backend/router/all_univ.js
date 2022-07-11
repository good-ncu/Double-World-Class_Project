const express = require('express')
const router = express.Router()
const client = require('../db/index')

router.get('/alluniv', function(req,res){
    client.query('select * from univ',(err, result) => {
        return res.send({
            univ: result.rows
        })
    })
})

module.exports = router