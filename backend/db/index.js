const { Client } = require('pg') 
 const client = new Client({ 
 user: 'postgres', 
 host: '118.31.110.156', 
 database: 'postgres', 
 password: 'just4good', 
 port: 5432, 
 }) 
 client.connect(); 
     //test for ljh ljs
 module.exports = client 



