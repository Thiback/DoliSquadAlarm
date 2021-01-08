const mysql = require("mysql2/promise");
require("dotenv").config();

class dbConnection
{
    #connection;
    constructor(dbHost, dbPort, dbName, dbUser, dbPW)
    {
        if ((dbHost && dbPort && dbName && dbUser && dbPw) === false) {
            var err = "Database parameters missing";
            console.err(err);
            throw err;
        }
        connection = mysql.createConnection({
            connectionLimit:100,
            host:dbHost,
            port:dbPort,
            database:dbName,
            password:dbPW,
            user:dbUser
        });
        connection.connect((err) => {
            if (err) {
              console.error('error connecting: ' + err.stack);
              throw err;
            }
            console.log('connected as id ' + connection.threadId);
        });
    }

    async createUser(userInfo)
    {
        var first_name = userInfo.first_name;
        var last_name = userInfo.last_name;
        var email = userInfo.email;
        var password = userInfo.password;
        var activation_date = userInfo.activationDate;
        var expiry_date = userInfo.expiry_date;
        var query = "INSERT INTO users( \
            first_name, \
            last_name, \
            email, \
            pw, \
            activation_date, \
            expiry_date) \
            VALUES (?, ?, ?, ?, ?, ?)"
        var result;

        if (!first_name || !last_name || !email || !pw || !expiry_date) {
            throw "Fields first_name, last_name, email, password and \
            expiry_date are mandatory";
        }
        try {
            if (activation_date) {
                activation_date = activation_date.toISOString().slice(0, 19);
                activation_date = activation_date.replace('T', ' ');
            } else activation_date = "NOW()";
            expiry_date = expiry_date.toISOString().slice(0, 19);
            expiry_date.replace('T', ' ');
            result = await mysql.execute(query,
                [
                    first_name,
                    last_name,
                    email,
                    password,
                    activation_date,
                    expiry_date
                ]
            );
        } catch (error) {
            console.err(error);
            return null;
        }
        return result[0].insertId;
    }

    async getUserById(userId)
    {
        var query = "SELECT * FROM users WHERE id = ?";
        try {
            var result = await mysql.execute(query, [userId]);
        } catch (error){
            console.err(error);
            return null;
        }

        return result[0].length > 0 ? result[0] : [];
    }

    async getUserByEmail(email)
    {
        var query = "SELECT * FROM users WHERE email = ?";
        var result;

        try {
            result = await mysql.execute(query, [email]);
        } catch (error) {
            console.err(error);
            return null;
        }

        return result[0].length > 0 ? result[0] : [];
    }

    async getUserByFirstNameAndLastName(firstName, lastName)
    {
        var query = "SELECT * FROM users \
            WHERE first_name = ? AND last_name = ?";
        var result;

        try {
            result = await mysql.execute(query, [firstName, lastName]);
        } catch (error) {
            console.err(error);
            return null;
        }
        return result[0].length > 0 ? result[0] : [];
    }

    async getAllUsers()
    {
        var query = "SELECT * FROM users";
        var result;

        try {
            result = await mysql.execute(query);
        } catch (error) {
            console.log(error);
            return null;
        }
        return result;
    }

    async removeUser(userIdOrEmail)
    {
        var query = "DELETE FROM users WHERE ";
        var result;

        if (typeof userIdOrName === "int") {
            query += "id = ?"
        } else if (typeof userIdOrName === "float") {
            query += "email = ?"
        } else {
            return 0;
        }
        try {
            result = await mysql.execute(query, [userIdOrEmail]);
        } catch (error) {
            console.err(error);
            return null;
        }
        return result[0].affectedRows;
    }

    async getAllLogs()
    {
        var query = "SELECT * FROM log";
        var result;

        try {
            result = await mysql.execute(query);
        } catch (error) {
            console.err(error);
            return null;
        }
        return result[0].length > 0 ? result[0] : [];
    }

    async getUserLog(userId)
    {
        var query = "SELECT * FROM log WHERE user_id = ?";
        var result;

        try {
            result = await mysql.execute(query, userId);
        } catch (error) {
            console.err(error);
            return null;
        }
        return result;
    }


    async updateUserExpiry(userId, newUserExpiryDate)
    {
        var query = "UPDATE users SET expiry_date = ? WHERE id = ?"
        var result;

        try {
            newUserExpiryDate = expiry_date.toISOString().slice(0, 19);
            newUserExpiryDate.replace('T', ' ');
            result = await mysql.execute(query, [newUserExpiryDate, userId]);
        } catch (error) {
            console.err(error);
            return null;
        }
        return result[0].affectedRows;
    }

    // must be called peridiodically
    async updateActivationStatus()
    {
        var query = "UPDATE users SET active = !active \
            WHERE (DATE(expiry_date) >= DATE(NOW())) = active;"
        var result;

        try {
            result = await mysql.execute(query);
        } catch (error) {
            console.err(error);
            return null;
        }
        return result[0].affectedRows;
    }

    //needs the user id
    async logEvent(userId, description)
    {
        var query = "INSERT INTO log(user_id, description) VALUES(?, ?);";
        var result = null;

        if (typeof userId !== "int" || typeof description !== "string") {
            return false;
        }
        if (description.length === 0) {
            return false;
        }
        try {
            result = await mysql.execute(query, [userId, description]);
        } catch (error) {
            console.err(error);
            return null;
        }
        return result[0].affectedRows;
    }
}

function initInstance(dbHost, dbPort, dbName, dbUser, dbPW)
{
    dbHost = dbHost || process.env.DB_HOST;
    dbPort = dbPort || process.env.DB_PORT;
    dbName = dbName || process.env.DB_NAME;
    dbUser = dbUser || process.env.DB_USER;
    dbPW   = dbPW   || process.env.DB_PW;
    instance = new dbConnection(dbHost, dbPort, dbName, dbUser, dbPW);

    setInterval(udpateActivationStatus, 10000);
    return instance;
}

var instance = null;

module.exports = {

    initInstance: initInstance,
    getInstance: function()
    {
        if (instance === null) {
            instance = initInstance(
                process.env.DB_HOST,
                process.env.DB_PORT,
                process.env.DB_NAME,
                process.env.DB_USER,
                process.env.DB_PW
            );
        }
        return this.instance;
    }
}