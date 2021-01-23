const dartParser = require('../common/parser/dartParser');
const elasticService = require('./elasticService');
var dartStockService = {
    updateFinancialStatements : async function({ quater, fileName, sheetName}) {
        const filePath = `${__dirname}/../../resources/dart/2020`;
        const xlsxObject = await dartParser.parseXlsxFile(filePath, fileName);
        const data = await dartParser.convertXlsxObjectToDocuments(xlsxObject, {quater, sheetName});
        await elasticService.insert(data);
    }
}

module.exports = dartStockService;