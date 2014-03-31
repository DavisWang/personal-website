var express = require('express'), app = express()
, http = require('http')
, server = http.createServer(app).listen(process.env.PORT || 3000);
var jade = require('jade');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.urlencoded());
    app.use(app.router);

});

app.get('/', function(req, res){
    console.log("GET Request made to " + '/');
    res.render('index.jade');
});
