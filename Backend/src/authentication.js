const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "-The_5ecret-5y5tem_of-the_5even-5tar5_";
const tokenExpirySeconds = 60;

function generateJWT(username)
{
    var token;

    try {
        token = jwt.sign({"username":username}, secret, {expiresIn:tokenExpirySeconds});
        return token;
    } catch (e) {
        console.log(e);
        return null;
    }
}

// todo : checkAdmin


// todo : generate out of the body email. No password checking
function login(req, res)
{
    var username = req.body.username;
    var password = req.body.password;
    var token;

    console.log("username = " + username);
    console.log("password = " + password);
    if(!username || !password || username != user.username || password != user.password) {
        return res.status(401).send();
    }
    console.log("valid ?");
    token = generateJWT(username);
    console.log(token);
    if (!token)
        return res.status(500).send();
    res.cookie("jwt", token, {httpOnly:true, secure:true, maxAge: tokenExpirySeconds * 1000}).send("you are logged in");
};

function isThereAValidJWT(req, res, next)
{
    //is the cookie expired ?
    //does that user exist ?
    //
    var cookies = req.cookies;
    var token;
    var payload;
    var username;

    if (!cookies) {
        return res.status(401).send("no cookies found");
    }
    console.log(cookies);
    token = req.cookies.jwt;
    console.log(cookies.jwt);
    if (!token)
        return res.status(401).send("no jwt found");
    try {
        payload = jwt.verify(token, secret);
    } catch (e) {
        return res.status(400).end();
    }
    username = payload.username;
    req.username = username;
    next();
}

module.exports = {
    login, isThereAValidJWT
}