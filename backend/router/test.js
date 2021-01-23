const dartStockService = require('../service/dartStockService');
const elasticService = require('../service/elasticService');


function router (app){
    app.get('/test/dart', async (req, res) => {

        let quater = req.query.quater || 1;
        let fileName = req.query.fileName;
        let sheetName = req.query.sheetName
        console.log('fetch test/dart');
        await dartStockService.updateFinancialStatements({ quater, fileName, sheetName});
        res.send('fetch test/dart');
    })
};

module.exports = router;