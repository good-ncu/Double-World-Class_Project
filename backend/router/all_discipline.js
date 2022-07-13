const express = require('express')
const router = express.Router()
const client = require('../db/index')

router.get('/alldiscipline', function(req,res){
    client.query('select * from discipline',(err, result) => {
        return res.send({
            discipline: result.rows
        })
    })
})

module.exports = router