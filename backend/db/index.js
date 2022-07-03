const { Client } = require('pg') 
 const client = new Client({ 
 user: '', 
 host: '', 
 database: '', 
 password: '', 
 port: 5432, 
 }) 
 client.connect(); 
     //test for ljh 
 module.exports = client 

