const { Client } = require('pg') 
 const client = new Client({ 
 user: 'postgres', 
 host: '192.168.0.202', 
 database: 'postgres', 
 password: 'just4good', 
 port: 5432, 
 }) 
 client.connect(); 
     //test for ljh ljs
 module.exports = client 


