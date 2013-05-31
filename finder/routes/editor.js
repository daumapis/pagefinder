
exports.form = function (req, res) {
	res.render('form', {
		title : 'Express',
		description : "『Node.Js 노드제이에스 프로그래밍』은 노드 프로그래밍의 입문서로서, 기본 개념부터 실무에 필요한 핵심 내용까지 폭넓게 다룸으로써 노드 프로그래밍을 쉽게 배워 다양하게 활용할 수 있도록 상세히 설명한다. 본문은 Node.js를 이해하기 위한 단계적인 설명과 예제 중심의 이해하기 쉬운 설명으로 구성되어 있다. 또한 Node.js 프로그래밍에서 필요한 필수 사항에 대한 폭넓은 내용을 다루며, 실무에 필요한 핵심 내용 위주의 학습으로 구성하였다..",
		"img" : "http://book.daum-img.net/R155x225/KOR9788960772762?moddttm=20130531102121",
		"author" : "변정훈",
		"lastPage" : 121
	});
};
