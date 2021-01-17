const daumStockService = require('../service/daumStockService');
const elasticService = require('../service/elasticService');
const https = require('https');
const fs = require('fs');
const puppeteer = require('puppeteer');

function router (app){
    app.get('/updateStockPrice', async (req, res) => {
        console.log('fetch stock price');
        // request.get('http://comp.fnguide.com/SVO2/json/data/01_06/01_A005930_A_D.json', (err, resp, body) => {
        //     console.log(resp)
        //     console.log(body);
        // })


        //27229234f749571f1a9f75a808356e3078612832
        request.get('https://opendart.fss.or.kr/api/fnlttXbrl.xml?crtfc_key=27229234f749571f1a9f75a808356e3078612832&rcept_no=20190401004781&reprt_code=11011', 
        function(err, resp, body){
            console.log(resp);
            console.log(body);
        }).pipe(fs.createWriteStream('dart.zip'));

        let market = req.query.market || 'KOSPI';
        let body = await daumStockService.getAllStockPrice(market);
        elasticService.upsert(body);
        res.send();
    })
    app.get('/testDart', async (req, res) => {
        console.log('fetch testDart');
        https.get(`https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?crtfc_key=27229234f749571f1a9f75a808356e3078612832&corp_code=00126380&bsns_year=2018&reprt_code=11011`
        , res => {
            res.on('data', (data) => { console.log(data) });
            console.log(res)
        });
        res.send('testDart');
    })
};

module.exports = router;