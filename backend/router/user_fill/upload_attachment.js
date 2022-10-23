const express = require('express')
const router = express.Router()

const upload_attachment = require('../../router_handler/user_fill/upload_attachment')
const pre_view_handler = require('../../router_handler/preview_table')
const public = require('../../excel_parsing/公用中间件multer')

router.post('/upload-attachment',
    function(req,res,next){
        res.set('Access-Control-Allow-Origin','*')
        next()
    },
    public.tempupload_word_file_callback,
    pre_view_handler.preview_attachment)
router.post('/upload-attachment-sub',upload_attachment.upload_sub)

module.exports = router