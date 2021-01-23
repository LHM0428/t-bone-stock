const xlsxParser = require('../common/parser/xlsxParser');
const dartRepository = require('../repository/dartRepository');
const request = require('request');

var dartStockService = {
    updateFinancialStatements : async function({ quater, fileName, sheetName}) {
        let filePath = `${__dirname}/../../resources/dart/2020`;
        const fsObject = await xlsxParser.xlsxToObject(filePath, fileName);
        const fsArray = fsObject[sheetName]; 
        
        /*기업 코드만 추출*/
        /*Map을 통해 중복 제거*/
        const companyMap = new Map();
        fsArray.forEach(obj => {
            let companyCode = obj['종목코드'].replace('[', '').replace(']',''); /*최초 [001040] 형태*/
            let companyName = obj['회사명'];
            companyMap.set(companyCode, companyName);
        });
        /*Object로 변환*/
        const companyArray = new Array();
        companyMap.forEach((value, key) => {
            let obj = {'companyCode' : key, 'companyName' : value};
            companyArray.push(obj);
        });

        /*기업코드만 따로 저장*/
        // await dartRepository.addCompanyCode(companyArray);
        /*재무제표 데이터 저장*/
        await dartRepository.addDartData(fsArray, companyArray, quater);


        /*test*/
        /* request('http://localhost:9200/fs1/company_code/005930?pretty', (error, res, body) => {
            console.log('응답 결과 1');
            console.log(body);
        });

        request('http://localhost:9200/fs2/financial_statements/005930?pretty', (error, res, body) => {
            console.log('응답 결과 2');
            console.log(body);
        }); */
    }
}

module.exports = dartStockService;