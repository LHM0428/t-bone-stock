const dartParser = require('../common/parser/dartParser');
const elasticService = require('../service/elasticsearch');
var dartStockService = {
    updateFinancialStatements : async function({year, quater, fileName, bizCode }) {
        const filePath = `${__dirname}/../../resources/dart/2020`;
        const xlsxObject = await dartParser.parseXlsxFile(filePath, fileName);
        const sheetName = (Object.keys(xlsxObject))[0]
        const documents = await dartParser.convertXlsxObjectToDocuments(xlsxObject, {year, quater, sheetName, bizCode});
        await elasticService.insert(documents);
    },
    getYearlyReport : async function({bizCode, year}) {
        let query = `   SELECT *
                        FROM    tbonestock
                        WHERE   category = 'quaterlyReport'
                            AND bizCode = '${bizCode}'
                            AND year = '${year}' `;
        let data = elasticService.sqlQuery(query);
        return data;
    },
    getQuaterlyReport : async function({bizCode, year, quater}) {
        let query = `   SELECT *
                        FROM    tbonestock
                        WHERE   category = 'quaterlyReport'
                            AND bizCode = '${bizCode}'
                            AND year = '${year}'
                            AND quater = '${quater}' `;
        let data = elasticService.sqlQuery(query);
        return data;
    },
}

module.exports = dartStockService;