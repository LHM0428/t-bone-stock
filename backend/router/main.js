const stockService = require('../service/stockService');


function router (app){
    app.get('/updateStockPrice', async (req, res) => {
        console.log('fetch stock price');
        let data = await stockService.getAllStockPrice();
        let dataStr = ''
        for(let group of data){
            let {includedStocks, sectorName} = group;
            dataStr += `<div>${sectorName}</div>
            <div>================================================</div>`;
            for(let i=1; i<=includedStocks.length; i++){
                let stock = includedStocks[i-1];
                dataStr += `<div>${i})`
                for(const [key, value] of Object.entries(stock)){
                    dataStr += `<div>${key} : ${value}</div>`;
                }
                dataStr += `</div>
                <div>---------------------------------------------------------</div>`
            }
        }
        res.send(dataStr)
    })
};

module.exports = router;