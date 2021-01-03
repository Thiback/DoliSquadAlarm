const mysql = require("mysql2/promise");

class dbConnection {

    #connection;
    constructor(dbHost, dbPort, dbName, dbUser, dbPW)
    {
        connection = mysql.createConnection({
            connectionLimit:100,
            host:dbHost,
            port:80
        });
        connection.connect((err) => {
            if (err) {
              console.error('error connecting: ' + err.stack);
              throw err;
            }
            console.log('connected as id ' + connection.threadId);
        });
    }

    function 
}