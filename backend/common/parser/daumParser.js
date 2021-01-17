const daumParser = {
    parseAllStock : function(data){
        let bulkBody = [];

        for(const group of data){
            let { accTradePrice, accTradeVolume, includedStocks, sectorName, market,
                sectorCode, date, changeRate, change} = group;
            
            if(change === 'FALL') changeRate *= -1;
            bulkBody.push({
                category: 'sector',
                market,
                sectorName,
                sectorCode, 
                changeRate,
                accTradePrice,
                accTradeVolume,
                date,
            })

            let parsedData = includedStocks.map( (stock) => {
                let { accTradePrice, accTradeVolume, change, changePrice, changeRate,
                code, foreignRatio, name, symbolCode, tradePrice} = stock;
                if(change === 'FALL') {
                    changeRate *= -1;
                    changePrice *= -1;
                }

                return {
                    category: 'stock',
                    market,
                    sectorName,
                    sectorCode,
                    stockName: name,
                    stockCode: symbolCode,
                    price: tradePrice,
                    enterpriseCode : code,
                    accTradePrice,
                    accTradeVolume,
                    foreignRatio,
                    date
                };
            });

            bulkBody = bulkBody.concat(parsedData);
        }
        return bulkBody;
    }
}

module.exports = daumParser;