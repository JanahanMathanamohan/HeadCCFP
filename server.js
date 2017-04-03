var  express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/public'));
app.use(flash());


require('./app/routes.js')(app);
app.listen(8080);
