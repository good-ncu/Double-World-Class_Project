const {Client} = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Double-World-Class_Project',
    password: 'zt123456',
    port: 5433,
})
client.connect();
export default client;
