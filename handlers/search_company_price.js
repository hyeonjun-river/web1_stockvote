
let client = require('cheerio-httpcli');

var search_company_price = function(params, callback) {
	console.log('JSON-RPC search_company_price 호출됨.');
    console.dir(params);
    
    let printHttpResponse = (word) =>client.fetch(
		"http://www.google.com/search"
		,{q:word}
		,(err, $, res, body)=>{
            let aList = $("div.aviV4d").find('span.IsqQVc');
            console.log($(aList[0]).text());
            

            let bList = $("div.E65Bx").find("div.oPhL2e");
            //for (var i = 0; i < bList.length; i++) {
                console.log($(bList[0]).text());
            //}

            let cList = new Array;
            cList.push($(aList[0]).text());
            cList.push($(bList[0]).text());

            console.log(cList);

            if(!$(aList).length){
                callback({
                    code : 400,
                    message : ''
                }, null);
                return;
            }

            callback(null, cList);
        }
        
	);
   
    var company_price = params[0];
    company_price = company_price.concat("주가");
    
    printHttpResponse(company_price);
	// // console.log(company_price);
       
    // console.log(price());
    

    
	
};

module.exports = search_company_price;