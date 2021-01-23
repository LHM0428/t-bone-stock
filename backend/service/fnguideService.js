const request = require('request');
const elasticService = require('./elasticService');

const fnguideService = {
    _getAllStockId : function() {
        let query = ` SELECT stockCode
                        FROM tbonestock
                       WHERE stockCode IS NOT NULL
                       GROUP BY stockCode`;
        let data = elasticService.sqlQuery(query);
    },
    getCompanyConsensus : function () {
        this._getAllStockId();
    }
}




module.exports = fnguideService;