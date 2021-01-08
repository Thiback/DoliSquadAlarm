const bcrypt = require("bcryptjs");

async function comparePassword(password, hash) {
    var result = null;

    if (!password || !hash) {
        return false;
    }
    result = await bcrypt.compare(password, hash);
    return result;
};

async function checkPasswordCompliance(res, password) {
    if (!password || typeof password !== "string") {
        res.status("400");
        res.send({created: false, str: "A 'user_password' is required "
            + "under a string format."});
        return false;
    } else if (password.length < 1) {
        res.status("400");
        res.send({created: false, str: "cannot set a empty 'user_password'"});
        return false;
    }
    return true;
}

async function hashPassword(res, password) {
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                console.error(err);
                res.status("500");
                res.send({str:"A bcrypt error occured"});
                throw (err);
            }
            resolve(hash);
        });
    });

    return hashedPassword;
}

module.exports = {
    comparePassword,
    checkPasswordCompliance,
    hashPassword
}