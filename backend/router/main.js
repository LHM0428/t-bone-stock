const daumStockService = require('../service/daumStockService');
const fnguideService = require('../service/fnguideService')
const elasticService = require('../service/elasticService');
const http = require('http');
const fs = require('fs');
const puppeteer = require('puppeteer');

function router (app){
    app.get('/updateStockPrice', async (req, res) => {
        console.log('fetch stock price');
        // request.get('http://comp.fnguide.com/SVO2/json/data/01_06/01_A005930_A_D.json', (err, resp, body) => {
        //     console.log(resp)
        //     console.log(body);
        // })
        elasticService.search();
        let market = req.query.market || 'KOSPI';
        let body = await daumStockService.getAllStockPrice(market);
        elasticService.upsert(body);
        res.send(`update ${market || 'KOSPI'} Stock Price complete!`);
    })

    app.get('/updateCompanyConsensus', async (req, response) => {

        fnguideService.getCompanyConsensus()
        console.log('fetch Company Consensus');
    })
};

module.exports = router;