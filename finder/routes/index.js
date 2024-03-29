
/*
 * GET home page.
 */

var Evernote = require('evernote').Evernote;
var config = require('../config.json');
var callbackUrl = "http://localhost:3000/oauth_callback";

exports.index = function(req, res){
  if(req.session.oauthAccessToken) {
    var token = req.session.oauthAccessToken;
    var client = new Evernote.Client({
      token: token,
      sandbox: config.SANDBOX
    });
    var note_store = client.getNoteStore();
    note_store.listNotebooks(token, function(notebooks){
      req.session.notebooks = notebooks;
      res.render('note', { token: token });
    });
  } else {
    res.render('index');
  }
};


exports.imgsave = function(req, res){
var fs2 = require('fs');
var request = require('request');

//request('http://icon.daumcdn.net/w/c/12/11/10192021148946703.png').pipe(fs2.createWriteStream('enlogo.png'));

request(req.query["url"]).pipe(fs2.createWriteStream('enlogo.jpg'));

res.json({});
};


exports.save = function(req, res){

var title = req.query["title"];
var body = req.query["body"];
var isbn = req.query["isbn"];
var page = req.query["page"];
var writer = req.query["writer"];
var monney = req.query["monney"];

fs = require('fs');
crypto = require('crypto');
Evernote = require('evernote').Evernote;

//
// A simple Evernote API demo script that lists all notebooks in the user's
// account and creates a simple test note in the default notebook.
//
// Before running this sample, you must fill in your Evernote developer token.
//
// To run (Unix):
//   node EDAMTest.js
//

// Real applications authenticate with Evernote using OAuth, but for the
// purpose of exploring the API, you can get a developer token that allows
// you to access your own Evernote account. To get a developer token, visit
// https://sandbox.evernote.com/api/DeveloperToken.action
var authToken = req.session.oauthAccessToken;

if (authToken == "your developer token") {
  console.log("Please fill in your developer token");
  console.log("To get a developer token, visit https://sandbox.evernote.com/api/DeveloperToken.action");
  process.exit(1);
}

// Initial development is performed on our sandbox server. To use the production
// service, change sandbox: false and replace your
// developer token above with a token from
// https://www.evernote.com/api/DeveloperToken.action
var client = new Evernote.Client({token: authToken, sandbox: true});

var userStore = client.getUserStore();

userStore.checkVersion(
    "Evernote EDAMTest (Node.js)",
    Evernote.EDAM_VERSION_MAJOR,
    Evernote.EDAM_VERSION_MINOR,
    function(versionOk) {
      console.log("Is my Evernote API version up to date? " + versionOk);
      console.log();
      if (!versionOk) {
        process.exit(1);
      }
    }
    );

var noteStore = client.getNoteStore();

// List all of the notebooks in the user's account
var notebooks = noteStore.listNotebooks(function(notebooks) {
  console.log("Found " + notebooks.length + " notebooks:");
  for (var i in notebooks) {
    console.log("  * " + notebooks[i].name);
  }
});


// To create a new note, simply create a new Note object and fill in
// attributes such as the note's title.
var note = new Evernote.Note();
note.title = title+" [page: "+page+"]";

// To include an attachment such as an image in a note, first create a Resource
// for the attachment. At a minimum, the Resource contains the binary attachment
// data, an MD5 hash of the binary data, and the attachment MIME type.
// It can also include attributes such as filename and location.
var image = fs.readFileSync('enlogo.jpg');
var hash = image.toString('base64');

var data = new Evernote.Data();
data.size = image.length;
data.bodyHash = hash;
data.body = image;

resource = new Evernote.Resource();
resource.mime = 'image/jpg';
resource.data = data;

// Now, add the new Resource to the note's list of resources
note.resources = [resource];

// To display the Resource as part of the note's content, include an <en-media>
// tag in the note's ENML content. The en-media tag identifies the corresponding
// Resource using the MD5 hash.
var md5 = crypto.createHash('md5');
md5.update(image);
hashHex = md5.digest('hex');

// The content of an Evernote note is represented using Evernote Markup Language
// (ENML). The full ENML specification can be found in the Evernote API Overview
// at http://dev.evernote.com/documentation/cloud/chapters/ENML.php
note.content = '<?xml version="1.0" encoding="UTF-8"?>';
note.content += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
note.content += '<en-note>';
note.content += 'page: '+page+'<br/>';
note.content += 'writer: '+writer+'<br/>';
note.content += 'monney: '+monney+'<br/>';
note.content += 'isbn: '+isbn+'<br/>';
note.content += 'body: '+body+'<br/>';
note.content += '<en-media type="image/png" hash="' + hashHex + '"/>';
note.content += '</en-note>';

// Finally, send the new note to Evernote using the createNote method
// The new Note object that is returned will contain server-generated
// attributes such as the new note's unique GUID.
noteStore.createNote(note, function(createdNote) {
  console.log();
  console.log("Creating a new note in the default notebook");
  console.log();
  console.log("Successfully created a new note with GUID: " + createdNote.guid);
});





    res.json({});

  //res.send(req.session.oauthAccessToken);
};

// OAuth
exports.oauth = function(req, res) {
  var client = new Evernote.Client({
    consumerKey: config.API_CONSUMER_KEY,
    consumerSecret: config.API_CONSUMER_SECRET,
    sandbox: config.SANDBOX
  });

  client.getRequestToken(callbackUrl, function(error, oauthToken, oauthTokenSecret, results){
    if(error) {
      req.session.error = JSON.stringify(error);
      res.redirect('/');
    }
    else { 
      // store the tokens in the session
      req.session.oauthToken = oauthToken;
      req.session.oauthTokenSecret = oauthTokenSecret;

      // redirect the user to authorize the token
      res.redirect(client.getAuthorizeUrl(oauthToken));
    }
  });

};

// OAuth callback
exports.oauth_callback = function(req, res) {
  var client = new Evernote.Client({
    consumerKey: config.API_CONSUMER_KEY,
    consumerSecret: config.API_CONSUMER_SECRET,
    sandbox: config.SANDBOX
  });

  client.getAccessToken(
    req.session.oauthToken, 
    req.session.oauthTokenSecret, 
    req.param('oauth_verifier'), 
    function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      if(error) {
        console.log('error');
        console.log(error);
        res.redirect('/');
      } else {
        // store the access token in the session
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTtokenSecret = oauthAccessTokenSecret;
        req.session.edamShard = results.edam_shard;
        req.session.edamUserId = results.edam_userId;
        req.session.edamExpires = results.edam_expires;
        req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
        req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;
        res.redirect('/note');
      }
    });
};

// Clear session
exports.clear = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};
