//import mysql2 package
const mysql2 = require('mysql2');

//connect to database
const db = mysql2.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'radio_staff'
    },
    console.log('Connected to the Radio Staff database.')
);


module.exports = db;