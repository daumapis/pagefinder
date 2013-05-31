
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , note = require('./routes/note')
  , editor = require('./routes/editor')
  , bookdetail = require('./routes/bookdetail')
  , search = require('./routes/search')
  , http = require('http')
  , path = require('path')
  , engine = require('ejs-locals');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secret'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
  });
  app.engine('ejs', engine);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/oauth', routes.oauth);
app.get('/oauth_callback', routes.oauth_callback);
app.get('/clear', routes.clear);
app.get('/imgsave', routes.imgsave);
app.get('/save', routes.save);
app.get('/editor', editor.form);
app.get('/detail', bookdetail.view);
app.get('/note', note.notelist);
app.get('/search', search.booksearch);
app.post('/addbook', function(req, res){
  var title = req.body.title;
  var author = req.body.author;
  var isbn = req.body.isbn;
  var price = req.body.price;
  console.log(title);
  console.log(author);
  console.log(isbn);
  console.log(price);
  // res.send(json_parsed.object);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
