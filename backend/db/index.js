const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
<<<<<<< HEAD
    host: 'localhost',
    database: 'shuangyiliu',
    password: '12345',
    port: 5432,
=======
    host: '222.204.6.192',
    database: 'syl_proj',
    password: 'work@good114',
    port: 12315,
>>>>>>> d89dafd1f74c465459b9cbd4a9237b863f0a7ca4
})
client.connect();


//test for ljh
module.exports = client
