const fileParser = require('../common/parser/fileParser');
const dartParser = require('../common/parser/dartParser');
const elasticService = require('../service/elasticsearch');
var dartStockService = {
    addQuaterlyReport : async function({ fileName, year, quater }) {
        const filePath = `dart/${year}`;
        const xlsxObject= await fileParser.parseXlsxFile(filePath, fileName);
        const companyReports = await fileParser.getCompanyReportsOf(xlsxObject);
        const allCompanyNameObject = await dartParser.getAllCompanyNameObjectOf(companyReports);
        const elasticDocument = await dartParser.getElasticDocumentOf(companyReports, allCompanyNameObject, {year, quater});
        const response = await elasticService.upsert(elasticDocument);
        return response;
    },
    /*
    getYearlyReport : async function({bizCode, year}) {
        let query = `   SELECT *
                        FROM    tbonestock
                        WHERE   category = 'quaterlyReport'
                            AND bizCode = '${bizCode}'
                            AND year = '${year}' `;
        let data = elasticService.sqlQuery(query);
        return data;
    },
    */
}

module.exports = dartStockService;