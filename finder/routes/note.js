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
    	console.log(notebooks);
    	var chkVal = false;
    	for(var i=0;i<notebooks.length;i++){
    		if(notebooks[i].name.match(keyword)){
    			chkVal = true;
    			temp = notebooks[i];
    			console.log("test1111")
    			
    		}
    	}
    	console.log("111")
    	if (!chkVal) {
    		console.log("222")
    		var notebook = new Evernote.Notebook();
    		notebook.name = keyword;
				notestore.createNotebook(notebook, function(createdNotebook) {
  					console.log(createdNotebook)
  					res.render('note', { note : "책 "});
				});
    	}else{
    		var notebook = new Evernote.Notebook();

    		var filter = new Evernote.NoteFilter();
			filter.ascending = true;
			filter.notebookGuid = temp.guid;
    		console.log(temp.guid)
    		var rspec = new Evernote.NotesMetadataResultSpec();
			rspec.includeTitle = true;
			rspec.includeNotebookGuid = true;
			notestore.findNotes(token, filter, 0, 100, rspec, function(note)
			{
				console.log(note);
				if (note.notes.length != 0) {
					res.render('booklist', note.notes);	
				}else{
					res.render('note', { note : "책 "});	
				};				
			})
    	};
    });
    //  function(notebooks){
    //   req.session.notebooks = notebooks;
    //   res.render('note', { note: notebooks.name });
    // }
    
  } else {
    res.render('index');
  }
};
