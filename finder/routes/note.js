var Evernote = require('evernote').Evernote;
var config = require('../config.json');


exports.notelist = function(req, res){
	 if(req.session.oauthAccessToken) {
    var token = req.session.oauthAccessToken;
    var client = new Evernote.Client({
      token: token,
      sandbox: config.SANDBOX
    });
    var note_store = client.getNoteStore();
    note_store.listNotebooks(token, function(notebooks){
      req.session.notebooks = notebooks;
      res.render('note', { note: notebooks.name });
    });
  } else {
    res.render('index');
  }
};
