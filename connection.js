const mysql2 = require('mysql2');
var connection = mysql2.createConnection({
    port: 4306,
    host: "localhost",
    user: "root",
    password: "",
    database: "api_test"
})

connection.connect((err) => {
    if (!err) {
        console.log("Connected")
    } else {
        console.log(err);
    }
})

module.exports = connection;