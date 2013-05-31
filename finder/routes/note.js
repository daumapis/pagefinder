var Evernote = require('evernote').Evernote;
var config = require('../config.json');
var callbackUrl = "http://localhost:3000/oauth_callback";


exports.note = function(req, res){
	res.render('note');
};