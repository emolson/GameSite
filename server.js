/**
 * Created by emols on 12/4/2016.
 */
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');

var app = express();

//Load routes
var dotGameRrouter = require('./routes/dotGameRoutes');
app.use("/dotGame", dotGameRrouter);

//Connect to mongoDB
mongoose.connect('mongodb://localhost/DotGame');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('Connected to database');
});

//Load models
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if(~filename.indexOf('.js')) {
        require(__dirname + '/models/' + filename);
    }
});


//



app.use(express.static(__dirname + "/public"));

app.listen(3000);
console.log('Server is running on port 3000');

//npm install -to get package dependencies.
//npm install -g npm@latest -if err out