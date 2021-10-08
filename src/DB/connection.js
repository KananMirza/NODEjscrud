const mysql = require("mysql2");


const connection = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    dateStrings: true,
    database:"nodejscrud",

});

connection.connect(error =>{
    if(error) throw error;

    console.log("Success Database Connection");
});

module.exports = connection;