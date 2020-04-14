/**
 * 주식 데이터베이스 스키마를 정의하는 모듈
 *
 * @date 2020-04-08
 * @author JG
 */

var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var StockSchema = mongoose.Schema({
	    company : String,
	    upposition : String,
	    downposition : String,
	    date_price : {type: Date, index: {unique: false}, 'default': Date.now},
		predict_price : Number,
		closing_price : String
	});
	
		
	// StockSchema.methods = {
	// 	saveVote : function(callback){
	// 		var self = this;

	// 		this

	// 스키마에 static 메소드 추가
	StockSchema.static('findByCompany', function(company, callback) {
		return this.find({company:company}, callback);
	});

	StockSchema.static('findByDatePrice', function(date_price, callback) {
		return this.find({date_price:date_price}, callback);
	});
	
	StockSchema.static('findAll', function(callback) {
		return this.find({}, callback);
	});
	
	console.log('StockSchema 정의함.');

	return StockSchema;
};

// module.exports에 StockSchema 객체 직접 할당
module.exports = Schema;

