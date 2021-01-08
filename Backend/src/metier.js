var database = require("./database");

module.exports = {

    /*
    **  email, password, 
    **
    */
    login: function (req, res, next)
    {
        var email = req.body.email;
        var password = req.body.password;
        var result;

        if (!email || !password) {
            return res.status(400).json({
                status: "KO", message: "Missing email or password"
            });
        }
        result = await database.getUserByEmail(email);
        if (result === null)
            return res.status(500).json({status:"KO"});
        else if (result.length === 0)
            return res.status(401).json({status: "KO"});
        if (password === result.password) {
            req.email = email;
            req.firstName = result.firstName;
            req.lastName = result.lastName;
            next(req, res);
        }
   },

    deactivateAlarm: function (req, res)
    {
        var userId = req.body.userId;
        var result;

        console.log(req.email + " deactivated the alarm !");
        result = await database.logEvent(userId, "Alarm deactivation");
        //api call goes here, must be checked below
        if (result === null) {
            return res.status(500).json({status: "KO"});
        }
        return res.json({status: "OK"});
    },

    activateAlarm: function (req, res)
    {
        var userId = req.body.userId;

        console.log(req.email + " activated the alarm !");
        result = await database.logEvent(userId, "Alarm activation");
        //api call goes here, must be checked below
        if (result === null) {
            return res.status(500).json({status: "KO"});
        }
        return res.json({status: "OK"});
    },

    getUserInfo: function (req, res)
    {
        var user = req.user;
        var userInfo;

        switch (typeof user) {
            case "string":
                userInfo = await database.getUserByEmail(user);
                break;
            case "int":
                userInfo = await database.getUserById(
                    user
                );
                break;
            case "object":
                if (!user.firstName || !user.lastName)
                    return res.status(400).end();
                userInfo = await database.getUserByFirstNameAndLastName(
                    user.firstName, user.lastName
                );
                break;
            default:
                return res.status(400).json({status:"KO"});
        }
        if (result.length != 0)
            res.json(result);
    },

    getAllUsersInfos: function (req, res)
    {
        var usersInfos;

        try {
            usersInfos = database.getAllUsersInfos;
        } catch (error) {
            res.status(500).send();
            return;
        }
        res.json(usersInfos);
    },

    createUser: function (req, res)
    {
        var userInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.pw,
            activationDate: req.body.activationDate,
            expiryDate: req.body.expiryDate
        };
        var result;

        if (!firstName || !lastName || !email || !password|| !expiryDate) {
            return res.status(400).json(
                {status: "KO", error: "See API code for the mandatory fields"});
        }
        result = await database.createUser(userInfo);
        if (result === null)
            return res.status(500).json({status:"KO"});
        else if (result === 0)
            return res.status(400).json({
                status:"KO", message:"Couldn't create user."}
            );
        return res.json({status:"OK"});
    },

    removeUser: function (req, res)
    {
        var user = req.userId || req.email;
        var result;

        if (!user) {
            return res.status(400).json({
                status: "KO", message:"user mail or id required"
            });
        }
        result = await database.removeUser(user);
        if (result === null) {
            return res.status(500).json({status:"KO"});
        }
        return res.status(200).json({status: "OK"});
    },

    updateUserExpiry: function (req, res)
    {
        var userId = req.body.userId;
        var newExpiryDate = req.body.newExpiryDate;
        var result;

        if (!userId || typeof userId !== "int" || 
            !newExpiryDate || typeof newExpiryDate !== "string")
            return res.status(400).send({status:"KO"});
        console.log("new user expiry for user " + userId + " is " + newExpiryDate);
        if (Date.compare(new Date(newExpiryDate), new Date()) <= 0) {
            return res.status(400).send({status:"KO", 
                message:"cannot set expiry date to before now."});
        }
        result = await database.updateUserExpiry(userId, newExpiryDate);
        if (result === null) {
            return res.status(500).json({status: "KO"});
        } else if (result <= 0) {
            return res.status(400).json({status: "KO"});
        }
        return res.json({status:"OK"});        
    },

    updateUserPassword: function (req, res)
    {
        //TODO
    },
};