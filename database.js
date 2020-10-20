var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

function insert_product(data) {
    connection.query("insert into products ")
}

connection.connect();
console.log("conneced to databse")
