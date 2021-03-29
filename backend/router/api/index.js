const sectorService = require('../../service/sectorService');
const consensusService = require('../../service/consensusService');
const stockService = require('../../service/stockService');
const consensusParser = require('../../common/parser/consensusParser');
const stockParser = require('../../common/parser/stockParser');
const dartService = require('../../service/dartStockService');

function api(app){
    app.get('/sectors/all', async (req, res) => {
        console.log('get all sectors')
        let result = await sectorService.getAllSectors();
        res.send(result);
    });


    app.get('/consensus/lastFourQuater', async (req, res) => {
        console.log('get last four quater consesus');
        try {
            let quaterConsessus = await consensusService.getLastFourQuartersConsensusByStocks();
            res.send(consensusParser.parseQuarterToWholeYearConsensus(quaterConsessus))
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    })
    
    app.get('/stocks/recent', async (req, res) => {
        console.log('get recent stocks');
        let { sectorName } = req.query;
        res.send(await stockService.getRecentStocksBySectorName(sectorName));
    })

    app.post('/dart/report/quater', async (req, res) => {
        console.log('update /dart/report/quater');
        let { fileName, year, quater } = req.query;
        res.send(await dartService.addQuaterlyReport({ fileName, year, quater }));
    })
}

module.exports = api;
