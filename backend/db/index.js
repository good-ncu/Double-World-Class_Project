const { Client } = require('pg')
const client = new Client({
    user: '',
    host: '',
    database: '',
    password: '',
    port: ,
})
client.connect();


//test for ljh
module.exports = client
