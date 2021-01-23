const xlsxParser = require('../common/parser/xlsxParser');
const dartRepository = require('../repository/dartRepository');

var dartStockService = {
    updateFinancialStatements : async function({ quater, fileName, sheetName}) {
        const filePath = `${__dirname}/../../resources/dart/2020`;
        const fsObject = await xlsxParser.xlsxToObject(filePath, fileName);
        const fsArray = fsObject[sheetName]; 
        
        /*기업 코드만 추출*/
        /*Map을 통해 중복 제거*/
        const companyMap = new Map();
        const companyArray = new Array();
        fsArray.forEach(obj => {
            let companyCode = obj['종목코드'].replace('[', '').replace(']',''); /*최초 [001040] 형태*/
            let companyName = obj['회사명'];
            if(!companyMap.has(companyCode)) {
                companyMap.set(companyCode, companyName);
                let obj = {'companyCode' : companyCode, 'companyName' : companyName};
                companyArray.push(obj);
            }
        });
        /*재무제표 데이터 저장*/
        await dartRepository.addDartData(fsArray, companyArray, quater);
    }
}

module.exports = dartStockService;