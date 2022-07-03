const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: '222.204.6.192',
    database: 'syl_proj',
    password: 'work@good114',
    port: 12315,
})
client.connect();


//test for ljh
module.exports = client
