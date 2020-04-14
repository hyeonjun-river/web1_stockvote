/*
 * 설정 파일
 *
 * @date 2016-11-10
 * @author Mike
 */

module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [
		{file:'./stock_schema', collection:'stock', schemaName:'StockSchema', modelName:'StockModel'}
	],
	route_info: [
	    {file:'./stock', path:'/process/vote_stock', method:'vote_stock', type:'get'} 
        
	],
	jsonrpc_api_path : '/api'
}