//검색한 결과를 웹 크롤링하여 보여줌


var vote_stock = function (req, res) {
	console.log('stock 모듈 안에 있는 vote_stock 호출됨.');

	// 요청 파라미터 확인
	var paramUpDown = req.body.updown || req.query.updown;
	var paramClosing_Price = req.body.closingprice || req.query.closingprice;
	var paramPre_Price = req.body.prePrice || req.query.prePrice;
	var paramCompany_name = req.body.companyname || req.query.companyname;
	console.log('요청 파라미터 : ' + paramUpDown + "종가" + paramClosing_Price + "예상 가격" + paramPre_Price + "회사 이름" + paramCompany_name);

	// 데이터베이스 객체 참조
	var database = req.app.get('database');

	// 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
	if (database.db) {

		res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });

		addVote(database, paramUpDown, paramClosing_Price, paramPre_Price, paramCompany_name, function (err, addedVote) {
			// 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
			if (err) {
				console.error('투표 추가 중 에러 발생 : ' + err.stack);

				
				res.write('<h2>투표 추가 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();

				return;
			}

			// 결과 객체 있으면 성공 응답 전송
			if (addedVote) {
				console.dir(addedVote);

				database.StockModel.findByCompany(paramCompany_name, function (err, results) {
					if (err) {
						console.error('투표 리스트 조회 중 에러 발생 : ' + err.stack);

						
						res.write('<h2>투표 리스트 조회 중 에러 발생</h2>');
						res.write('<p>' + err.stack + '</p>');
						res.end();

						return;
					}

					if (results) {
						console.dir(results);

						var upup =0;
						var downdown = 0;
						for (var i = 0; i < results.length; i++) {
							var curUpposition = results[i]._doc.upposition; 
							
							console.log(curUpposition);
							if(curUpposition == "upside"){
								upup++;
								console.log(upup);
							} else {
								downdown++;
							}


						}

						
						// 뷰 템플레이트를 이용하여 렌더링한 후 전송
						var context = { results: results, upup : upup, downdown : downdown, curCompany : results[0]._doc.company, curDate_price :  results[0]._doc.date_price, curClosing_price : results[0]._doc.closing_price};
						req.app.render('addVote', context, function (err, html) {
							if (err) {
								console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);

								
								res.write('<h2>뷰 렌더링 중 에러 발생</h2>');
								res.write('<p>' + err.stack + '</p>');
								res.end();

								return;
							}
							console.log('rendered : ' + html);

							res.end(html);
						});

					}
				});

			} else {  // 결과 객체가 없으면 실패 응답 전송
				
				res.write('<h2>투표 추가  실패</h2>');
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}






}

//사용자를 등록하는 함수
var addVote = function (database, updown, closing_price, pre_price, company_name, callback) {
	console.log('addVote 호출됨.');

	// UserModel 인스턴스 생성
	var Vote = new database.StockModel({
		"company": company_name,
		"upposition": updown,
		"downposition": "",
		"date_price": Date.now(),
		"predict_price": pre_price,
		"closing_price": closing_price
	});

	// save()로 저장
	Vote.save(function (err) {
		if (err) {
			callback(err, null);
			return;
		}

		console.log("투표 데이터 추가함.");
		callback(null, Vote);

	});
}

module.exports.vote_stock = vote_stock;