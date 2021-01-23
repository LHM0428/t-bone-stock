const dartStockService = require('../service/dartStockService');

function router (app){
    app.get('/test/dart', async (req, res) => {
        /*
        quater
            2020_3분기보고서_01_재무상태표_연결_20201225 : 당기 3분기말
            2020_3분기보고서_03_포괄손익계산서_연결_20201225 : 당기 3분기 3개월
            2020_3분기보고서_04_현금흐름표_연결_20201225 : 당기 3분기
        */
        let quater = req.query.quater;
        let fileName = req.query.fileName;
        let sheetName = req.query.sheetName
        console.log('fetch test/dart');
        await dartStockService.updateFinancialStatements({ quater, fileName, sheetName});
        res.send('fetch test/dart');
    })
};

module.exports = router;