var ObjectGlobal = {};
var apikey = "270a7930f2ed9c030c0bd09a27f874fb4ed09987";
ObjectGlobal.isPageNo = ObjectGlobal.isPageNo || 1;
ObjectGlobal.totalCount = ObjectGlobal.totalCount || 0;
ObjectGlobal.currentCount = ObjectGlobal.currentCount || 0;
ObjectGlobal.currentPage = ObjectGlobal.currentPage || 0;
ObjectGlobal.isResultDownload = false
ObjectGlobal.isData = []


function submitF(){

	$.ajax({
		url: "http://localhost:3000/imgsave?url=http://book.daum-img.net/R110x160/BOK00019695251BA",
		type : "GET"
	}).done(function( data ) {
		

		top.location.href='http://localhost:3000/save?title=test&isbn=8917218342&page=10&writer=ets&monney=16000&body=test';


	});


		
	alert("에버노트에 저장되었습니다.")

}

var tmp;

var daumSearch = function(title, pageno, callback, isSearch){
	var urlString = "http://apis.daum.net/search/book?apikey="+ apikey + "&result=10&output=json&pageno=" + pageno + "&q=" + title;
	console.log(urlString);
	$.ajax({
		url: urlString,
		type : "GET",
		cache: false,
		async: false
	}).done(function( data ) {
		if( console && console.log) 
			console.log(data);
		ObjectGlobal.isResultDownload = false;
		callback(data, isSearch);
	});
}

var appendBook = function(data, isSearch){
	if( console && console.log) 
		console.log(data)
	tmp = data
	if( isSearch === true ){
		console.log("isSearch")
		$("#myCarousel").empty();
		$("#myCarousel").append('<div class="carousel-inner"></div>')
		ObjectGlobal.totalCount = data.channel.totalCount;
		ObjectGlobal.currentCount = 0;
		ObjectGlobal.isData = []
	}

	if( typeof data === "undefined" || typeof data.channel === "undefined" || typeof data.channel.item === "undefined"){
		alert("Error");
		return false;
	} else {
		var item = data.channel.item;
		if( item.length !== 0){
			
			var activeCheck = false;
			for( var i = 0; i < item.length; i++ ){
				var tmpHtml = "<div class=\"item";
				if( activeCheck === false && $("#myCarousel .active").length === 0 ){
					tmpHtml += " active";
					activeCheck = true;
				}
				tmpHtml += "\" style=\"text-align: center!important;\">";
				tmpHtml += "<img src=\""
				tmpHtml += item[i].cover_l_url.length === 0 ? "/img/empty_book.png" : item[i].cover_l_url;
				tmpHtml += "\"onclick=\"detailList()\" style=\"display: inline\">"
				tmpHtml += "</div>";
				console.log(tmpHtml)

				ObjectGlobal.isData.push(item[i])
				
				$("#myCarousel div.carousel-inner").append(tmpHtml)
			}
			if (ObjectGlobal.currentCount === 0 ) {
				var text1 = '<a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>'
				var text2 = '<a class="right carousel-control" href="#myCarousel" data-slide="next" onclick="nextList()">&rsaquo;</a>'
				$("#myCarousel").append(text1);
				$("#myCarousel").append(text2);
			}
			ObjectGlobal.currentCount += item.length;



		} else {
			alert("데이터가 없습니다.");
			return false;
		}
	}
}

var nextList = function(){

	var active = $("#myCarousel").find('.item.active');
	active.parent().children()
	var items = active.parent().children()
	var index = items.index(active)

	if( ObjectGlobal.totalCount !== ObjectGlobal.currentCount && items.length - 2 <= index && ObjectGlobal.isResultDownload === false ){
		ObjectGlobal.isResultDownload = true
		daumSearch($("#id_search_input").val(), ++ObjectGlobal.isPageNo, appendBook, false)
	}
}

var sendEvernote = function(){
	var active = $("#myCarousel").find('.item.active');
	active.parent().children()
	var items = active.parent().children()
	var index = items.index(active)	

	var data = ObjectGlobal.isData[index]

	var urlPath = "/addbook"
	console.log(data)
	// console.log(data.title, data.author, data.list_price, data.isbn, data.cover_l_url)
	$.ajax({
		url: urlPath,
		type : "POST",
		data : {title : data.title, author : data.author, price : data.list_price, isbn : data.isbn, imgUrl : data.cover_l_url}
	}).done(function( data ) {
		console.log("Success");
		console.log(data);
		window.aaa = data;
		$("#id_bookInfo").append(data);
	}).fail(function(){
		console.log("aaaa")
	});

	return false;
}

var detailList = function(){
	var active = $("#myCarousel").find('.item.active');
	active.parent().children()
	var items = active.parent().children()
	var index = items.index(active)

	var data = ObjectGlobal.isData[index]

	$("#id_bookInfo").empty()
	$("#myCarousel").attr("style", "display:none;")
	$("#id_bookInfo").attr("style", "")
	$("#id_bookInfo").append("<h1>" + "제목 : " + data.title + "</h1>");
	$("#id_bookInfo").append("<h3>" + "저자 : " + data.author + "</h3>");
	$("#id_bookInfo").append("<h3>" + "ISBN : " + data.isbn + "</h3>");
	$("#id_bookInfo").append("<h3>" + "가격 : " + data.list_price + "</h3>");
	$("#id_bookInfo").append("<img src=\"" + data.cover_l_url + "\" />");
	$("#id_bookInfo").append('<button type="submit" class="btn" onclick="sendEvernote()">Evernote</button>');
	$("#id_bookInfo").append('<button type="cancel" class="btn" onclick="backList()">뒤로가기</button>');

	// $("#id_bookInfo").append("<h3>" + "제목 : " + data.title + "</h1>");
}

var backList = function(){
	$("#myCarousel").attr("style", "")
	$("#id_bookInfo").attr("style", "display:none;")
}

$("#id_search").submit(function(){
				// console.log($("input").val())
				var title = $("#id_search_input").val()
				if (title.length !== 0) {
					ObjectGlobal.isFirst = true
					console.log("input")
					ObjectGlobal.isPageNo = 1;
					ObjectGlobal.totalCount = 0;
					daumSearch(title, 1, appendBook, true);
					
				}
				return false;
			});


// title, author, isbn, price