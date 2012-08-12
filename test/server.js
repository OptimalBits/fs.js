var express = require('express'),
    app = express.createServer();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/..'));
app.use(express.static(__dirname + '/fixtures'));
app.listen(8080);
console.log("Started test server at port: %d in %s mode", app.address().port, app.settings.env);
