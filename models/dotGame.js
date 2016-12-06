/**
 * Created by emols on 12/5/2016.
 */
var mongoose = require('mongoose');

var dotSchema = new mongoose.Schema({
    accuracy: Number,
    time: Number
});

//If going to hold another object

var dotGame = mongoose.model('dotGame', dotSchema);

module.exports = dotGame;