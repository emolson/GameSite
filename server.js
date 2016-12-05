/**
 * Created by emols on 12/4/2016.
 */
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DotGame');

let jsonParser = bodyParser.json();

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('Connected to database');
});

let dotSchema = new mongoose.Schema({
    accuracy: Number,
    time: Number
});
let dotGame = mongoose.model('dotGame', dotSchema);

app.post('/api/saveDotGame', jsonParser, function(req,res) {
   if(!req.body) return res.sendStatus(400);
   res.send('saving dot game');
});

// let gameExample = new dotGame({
//     accuracy: .94,
//     time: 1.23
// });
//
// gameExample.save(function(err, gameExample) {
//     if(err) {
//         return console.log(err);
//     }
//     //console.log(gameExample);
// });
//
// dotGame.find(function(err, games) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log(games);
// });


app.use(express.static(__dirname + "/public"));

app.listen(3000);
console.log('Server is running on port 3000');

//npm install -to get package dependencies.
//npm install -g npm@latest -if err out