
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
app.get('/detail', bookdetail.view);
app.get('/note', note.notelist);
app.get('/search', search.booksearch);
app.post('/addbook', function(req, res){
  var title = req.body.title;
  var author = req.body.author;
  var isbn = req.body.isbn;
  var price = req.body.price;
  var img = req.body.imgUrl;
  console.log(title);
  console.log(author);
  console.log(isbn);
  console.log(price);
  // res.send("ok");
  res.render('form', {
    title : title,
    description : "테스트입니다.",
    "img" : img,
    "author" : author,
    "lastPage" : 0
  });

// res.render('form', {
//     title : 'Express',
//     description : "『Node.Js 노드제이에스 프로그래밍』은 노드 프로그래밍의 입문서로서, 기본 개념부터 실무에 필요한 핵심 내용까지 폭넓게 다룸으로써 노드 프로그래밍을 쉽게 배워 다양하게 활용할 수 있도록 상세히 설명한다. 본문은 Node.js를 이해하기 위한 단계적인 설명과 예제 중심의 이해하기 쉬운 설명으로 구성되어 있다. 또한 Node.js 프로그래밍에서 필요한 필수 사항에 대한 폭넓은 내용을 다루며, 실무에 필요한 핵심 내용 위주의 학습으로 구성하였다..",
//     "img" : "http://book.daum-img.net/R155x225/KOR9788960772762?moddttm=20130531102121",
//     "author" : "변정훈",
//     "lastPage" : 121
//   });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
