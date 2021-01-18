const dartStockService = require('../service/dartStockService');
const elasticService = require('../service/elasticService');


function router (app){
    app.get('/test/dart', async (req, res) => {
        console.log('fetch test/dart');
        await dartStockService.updateFinancialStatements();
        res.send('fetch test/dart');
    })
};

module.exports = router;