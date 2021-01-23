const elasticService = require('../service/elasticService');
const moment = require('moment');
var dartRepository = {

    /* ifrs-full_Revenue	매출
    ifrs-full_CostOfSales 매출원가
    ifrs-full_GrossProfit 매출총이익
    dart_OperatingIncomeLoss	영업이익
    ifrs-full_ProfitLoss	 분기순이익
    ifrs-full_ComprehensiveIncome	분기총포괄이익
    ifrs-full_ProfitLossAttributableToAbstract	분기순이익의 귀속
    ifrs-full_EarningsPerShareAbstract	주당이익 [abstract]
    ifrs-full_BasicEarningsLossPerShare	   기본주당이익
    ifrs-full_DilutedEarningsLossPerShare  희석주당이익 */
    _codeMapper : {
        "ifrs-full_Revenue": "fullRevenue",
        "ifrs-full_CostOfSales": "costOfSales",
        "dart_OperatingIncomeLoss": "operatingIncomeLoss",
        "ifrs-full_ProfitLoss": "fullProfitLoss",
        "ifrs-full_ComprehensiveIncome": "fullComprehensiveIncome",
        "ifrs-full_ProfitLossAttributableToAbstract": "fullProfitLossAttributableToAbstract",
        "ifrs-full_EarningsPerShareAbstract": "fullEarningsPerShareAbstract",
        "ifrs-full_BasicEarningsLossPerShare": "fullBasicEarningsLossPerShare",
        "ifrs-full_DilutedEarningsLossPerShare": "fullDilutedEarningsLossPerShare"
    },
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
    addDartData : async function(fsArray, companyArray, quater){
        let companyMap = {},
        fsObj, companyCode, itemCode, value;

        /*Object로 변환*/
        for(let i=0; i<companyArray.length; i++) {
            let { companyCode } = companyArray[i];
            companyMap[companyCode] = {};
        }
        for(let j=0; j<fsArray.length; j++) {
            fsObj = fsArray[j];
            if(this._codeMapper[fsObj['항목코드']]){
                companyCode = fsObj['종목코드'].replace('[', '').replace(']',''); /*최초 [001040] 형태*/
                itemCode = this._codeMapper[fsObj['항목코드']];
                value = fsObj[`당기 ${quater}분기 3개월`];

                companyMap[companyCode][itemCode] = value;
            }
        } 

        for(let i=0; i<companyArray.length; i++) {
            let { companyCode } = companyArray[i];
            companyArray[i] = {
                ...companyArray[i],
                ...companyMap[companyCode],
                category: 'quaterlyReport',
                id: companyCode,
                date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
        }
        /*insert*/
        await elasticService.insert(companyArray);        
    }
};

module.exports = dartRepository;