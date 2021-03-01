const dartStockService = require('../service/dartStockService');

function router (app){
    app.put('/api/dart/report/quaterly', async (req, res) => {
        console.log('fetch /api/dart/report/quaterly');

        const year       = req.query.year;
        const quater     = req.query.quater;
        const fileName   = req.query.fileName;  
        const bizCode    = req.query.bizCode;       
        await dartStockService.updateFinancialStatements({ year, quater, fileName, bizCode});
        res.send('fetch /api/dart/report/quaterly');
    })

    app.get('/api/dart/report/yearly', async(req, res) => {
        console.log('fetch /api/dart/report/yearly');

        const bizCode = req.query.bizCode;
        const year = req.query.year;
        const resData = await dartStockService.getYearlyReport({bizCode, year});
        res.send(resData);
    })

    app.get('/api/dart/report/quaterly', async(req, res) => {
        console.log('fetch /api/dart/report/quaterly');

        const bizCode = req.query.bizCode;
        const year = req.query.year;
        const quater = req.query.quater;
        const data = await dartStockService.getQuaterlyReport({bizCode, year, quater});
        res.send(data);
    })
};

module.exports = router;