var Evernote = require('evernote').Evernote;
var config = require('../config.json');


exports.notelist = function(req, res){
	 if(req.session.oauthAccessToken) {
    var token = req.session.oauthAccessToken;
    var client = new Evernote.Client({
      token: token,
      sandbox: config.SANDBOX
    });
    var list;
     
    var notestore = client.getNoteStore();
    var temp = {};
    var keyword = "pagefinder";
 
    notestore.listNotebooks(token, function(notebooks){
    	// console.log(notebooks);
    	var chkVal = false;
    	for(var i=0;i<notebooks.length;i++){
    		if(notebook[i].name.match(keyword)){
    			chkVal = true;
    			temp = notebooks[i];
    		}
    	}
    	if (!chkVal) {

    		var notebook = new Evernote.Notebook();
    		notebook.name = keyword;
				notestore.createNotebook(notebook, function(createdNotebook) {
  					console.log(createdNotebook)
  					res.render('note', { note : notebook.name});
				});
    	}else{
    		res.render('note', { note : temp.name});
    	};
      req.session.notebooks = notebooks;

      
    });
    //  function(notebooks){
    //   req.session.notebooks = notebooks;
    //   res.render('note', { note: notebooks.name });
    // }
    
  } else {
    res.render('index');
  }
};



// var filter = new NoteFilter();
// filter.setOrder(1);
// var list = [];
// list[0] = record.guid;
// filter.setTags(list);
// enyo.application.NoteStore.findNotes(onSuccess3,this.showAlertMessage.bind(this, "Failed to get Notelist"), filter,
// 		  0, 5);
// NoteFile.js: (setTags method)
// ...
// NoteFilter.prototype.setTags = function(tags) {
// if(tags === 'null'){
//   this.tagGuids = null;
// }
// else{
//   var list = [];
//   console.log("tags.length: "+tags.length);
//   for (var i = 0; i < tags.length; i++) {
//     list[i] = tags[i];
//   }
//   this.tagGuids = list;
// }
// };