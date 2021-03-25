const dartParser = require('../common/parser/dartParser');
const elasticService = require('../service/elasticsearch');
var dartStockService = {
    updateFinancialStatements : async function({ quater, fileName, sheetName}) {
        const filePath = `${__dirname}/../../resources/dart/2020`;
        const xlsxObject = await dartParser.parseXlsxFile(filePath, fileName);
        const data = await dartParser.convertXlsxObjectToDocuments(xlsxObject, {quater, sheetName});
        await elasticService.insert(data);
    },
    getQuaterlyReport : async function(quater) {
        let query = `   SELECT *
                        FROM    tbonestock
                        WHERE   category = 'quaterlyReport'
                            AND bizCode = 'cashFlowStatement'`;
        let data = elasticService.sqlQuery(query);
        return data;
    }
}

module.exports = dartStockService;