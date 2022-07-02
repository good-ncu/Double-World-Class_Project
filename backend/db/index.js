const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Double-World-Class_Project',
    password: 'root',
    port: 5432,
})
client.connect();
//jjjj
module.exports = client