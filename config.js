/*
 * 설정 파일
 *
 * @date 2016-11-10
 * @author Mike
 */

module.exports = {
	server_port: process.env.PORT,
	db_url: 'mongodb://web1:godseller1!@ds127391.mlab.com:27391/heroku_g16gvzp6',
	db_schemas: [
		{file:'./stock_schema', collection:'stock', schemaName:'StockSchema', modelName:'StockModel'}
	],
	route_info: [
	    {file:'./stock', path:'/process/vote_stock', method:'vote_stock', type:'get'} 
        
	],
	jsonrpc_api_path : '/api'
}