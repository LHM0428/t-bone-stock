const elasticService = require('../service/elasticService');

var dartRepository = {
    addCompanyCode : async function(companyArray){
        /*elasticSearch 전달 값 구성*/
        const bulkObj = {
            datasource: companyArray,
            onDocument (doc) {
              return {
                index: { _index:'fs1',
                         _type :'company_code',
                         _id   :doc.companyCode }
              }
            }
        }        
        /*insert*/
        await elasticService.insert(bulkObj);
    },
    addDartData : async function(fsArray, companyArray){
        let allDataCompanyArray = companyArray;
        /*Object로 변환*/
        for(let i=0; i<allDataCompanyArray.length; i++) {
            let companyCodeObj = allDataCompanyArray[i];
            let currentCompanyCode = companyCodeObj.companyCode;
            for(let j=0; j<fsArray.length; j++) {
                let fsObj = fsArray[j];
                let companyCode = fsObj['종목코드'].replace('[', '').replace(']',''); /*최초 [001040] 형태*/
                let itemCode = fsObj['항목코드'];
                let value = fsObj['당기 3분기 3개월'];
                if(currentCompanyCode === companyCode) {
                    companyCodeObj[itemCode] = value;                    
                } else {
                    continue;
                }
            }            
        }
        /*elasticSearch 전달 값 구성*/
        const bulkObj = {
            datasource: allDataCompanyArray,
            onDocument (doc) {
              return {
                index: { _index:'fs2',
                         _type :'financial_statements',
                         _id   :doc.companyCode }
              }
            }
        }        
        /*insert*/
        await elasticService.insert(bulkObj);        
    }
};

module.exports = dartRepository;