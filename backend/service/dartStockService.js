const xlsxParser = require('../common/parser/xlsxParser');

var dartStockService = {
    updateFinancialStatements : async function() {
        let filePath = `${__dirname}/../../resources/dart/2020`;
        let fileName = '2020_3분기보고서_02_손익계산서.xlsx';
        const fsObject = await xlsxParser.xlsxToObject(filePath, fileName);
        
        let sheetName = '2020_3분기보고서_02_손익계산서_20201225';
        const fsArray = fsObject[sheetName]; 
        
        const companyMap = new Map();
        fsArray.forEach(obj => {
            let companyCode = obj['종목코드'].replace('[', '').replace(']',''); /*최초 [001040] 형태*/
            let companyName = obj['회사명'];
            companyMap.set(companyCode, companyName);
        });

        const companyArray = new Array();
        companyMap.forEach((value, key) => {
            let obj = {'companyCode' : key, 'companyName' : value};
            companyArray.push(obj);
        });
        
        console.log(companyArray);
    }
}

module.exports = dartStockService;