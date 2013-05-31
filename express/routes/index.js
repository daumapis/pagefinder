
/*
 * GET home page.
 */

var Evernote = require('evernote').Evernote;

var callbackUrl = "http://localhost:3000/oauth_callback";

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
