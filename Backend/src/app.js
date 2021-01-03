const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("body-parser");

//const routes = require("./routes");

var app = express();

app.use(cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
//app.use(routes);

app.listen(8000, () => {
    console.log("App online on port 80");
});