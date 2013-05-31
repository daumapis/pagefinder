var ObjectGlobal = {};
var apikey = "270a7930f2ed9c030c0bd09a27f874fb4ed09987";
ObjectGlobal.isPageNo = ObjectGlobal.isPageNo || 1;
ObjectGlobal.totalCount = ObjectGlobal.totalCount || 0;
ObjectGlobal.currentCount = ObjectGlobal.currentCount || 0;
ObjectGlobal.currentPage = ObjectGlobal.currentPage || 0;
ObjectGlobal.isResultDownload = false

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
				tmpHtml += "\">";
				tmpHtml += "<a href=\"#\">"
				tmpHtml += "<img src=\""
				tmpHtml += item[i].cover_l_url.length === 0 ? "/img/empty_book.png" : item[i].cover_l_url;
				tmpHtml += "\"></a>"
				tmpHtml += "</div>";
				console.log(tmpHtml)
				
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