const fs = require("fs");
const iconv = require('iconv-lite');
const parse  = require("csv-parse/lib/sync");
const xlsx = require("xlsx");
const moment = require('moment');

const dartParser = {
    parseXlsxFile : async function(filePath, fileName) {
        //엑셀 파싱
        // const resourcesDir = `${__dirname}/../../resources/dart/2020`;        
        // const xfile = xlsx.readFile(resourcesDir + '/2020_3분기보고서_02_손익계산서.xlsx');
        const fileFullName = `${filePath}/${fileName}`;
        const xfile = xlsx.readFile(fileFullName);
        const sheetnames = Object.keys(xfile.Sheets);
        
        const resData = {};
        // 파일별로 sheet 1개만 사용중
        const sheetname = sheetnames[0];
        resData[sheetname] = xlsx.utils.sheet_to_json(xfile.Sheets[sheetname]);
        
        return resData;
    },
    parseCsvFile : async function(filePath, fileName) {
        //csv 파싱
        const fileFullName = `${filePath}/${fileName}`;
        const csv = fs.readFileSync(fileFullName);
        /*읽는 파일이 text파일인경우 대체로 euc-kr이기떄문에 디코딩 필요*/
        const utf8 = iconv.decode(csv, 'euc-kr'); 
        const records = parse(utf8.toString(), {delimiter:'\t'});
        return records;
    },
    _codeMapper : {
        /* 
        #포괄손익계산서_연결
        ifrs-full_Revenue	매출
        ifrs-full_CostOfSales 매출원가
        ifrs-full_GrossProfit 매출총이익
        dart_OperatingIncomeLoss	영업이익
        ifrs-full_ProfitLoss	 분기순이익
        ifrs-full_ComprehensiveIncome	분기총포괄이익
        ifrs-full_ProfitLossAttributableToAbstract	분기순이익의 귀속
        ifrs-full_EarningsPerShareAbstract	주당이익 [abstract]
        ifrs-full_BasicEarningsLossPerShare	   기본주당이익
        ifrs-full_DilutedEarningsLossPerShare  희석주당이익 
        #재무상태표_연결
        ifrs-full_Assets    자산총계
        ifrs-full_Liabilities   부채총계
        ifrs-full_IssuedCapital      자본금
        ifrs-full_Equity   자본총계
        ifrs-full_EquityAndLiabilities	부채와자본총계
        #현금흐름표_연결
        ifrs-full_CashFlowsFromUsedInOperatingActivities	영업활동 현금흐름
        ifrs-full_CashFlowsFromUsedInInvestingActivities	투자활동 현금흐름
        ifrs-full_CashFlowsFromUsedInFinancingActivities	재무활동 현금흐름
        */
        /*포괄손익계산서_연결*/
        "ifrs-full_Revenue": "fullRevenue",
        "ifrs-full_CostOfSales": "costOfSales",
        "dart_OperatingIncomeLoss": "operatingIncomeLoss",
        "ifrs-full_ProfitLoss": "fullProfitLoss",
        "ifrs-full_ComprehensiveIncome": "fullComprehensiveIncome",
        "ifrs-full_ProfitLossAttributableToAbstract": "fullProfitLossAttributableToAbstract",
        "ifrs-full_EarningsPerShareAbstract": "fullEarningsPerShareAbstract",
        "ifrs-full_BasicEarningsLossPerShare": "fullBasicEarningsLossPerShare",
        "ifrs-full_DilutedEarningsLossPerShare": "fullDilutedEarningsLossPerShare",
        /*재무상태표_연결*/
        "ifrs-full_Assets": "fullAssets", 
        "ifrs-full_Liabilities": "fullLiabilities", 
        "ifrs-full_IssuedCapital": "fullIssuedCapital", 
        "ifrs-full_Equity": "fullEquity", 
        "ifrs-full_EquityAndLiabilities": "fullEquityAndLiabilities", 
        /*현금흐름표_연결*/
        "ifrs-full_CashFlowsFromUsedInOperatingActivities": "fullCashFlowsFromUsedInOperatingActivities",	
        "ifrs-full_CashFlowsFromUsedInInvestingActivities": "fullCashFlowsFromUsedInInvestingActivities",	
        "ifrs-full_CashFlowsFromUsedInFinancingActivities": "fullCashFlowsFromUsedInFinancingActivities",	
    },

    convertXlsxObjectToDocuments : async function(xlsxObjects, {year, quater, sheetName, bizCode}) {

        const xlsxObject = xlsxObjects[sheetName];
        
        let companyArray = [];
        let tempCompanyMap = {};
        let companyMap = {};
        
        xlsxObject.forEach(obj => {
            let companyCode = obj['종목코드'].replace('[', '').replace(']',''); /*최초 [001040] 형태*/
            let companyName = obj['회사명'];        
            if(!(tempCompanyMap[companyCode])) {
                tempCompanyMap[companyCode] = companyName;

                companyMap[companyCode] = {};
                
                let obj = {'companyCode' : companyCode, 'companyName' : companyName};
                companyArray.push(obj);
            }
        });
        
        let dataRow, companyCode, itemCode, value;
        for(let j=0; j<xlsxObject.length; j++) {
            dataRow = xlsxObject[j];
            if(this._codeMapper[dataRow['항목코드']]){
                companyCode = dataRow['종목코드'].replace('[', '').replace(']',''); /*최초 [001040] 형태*/
                itemCode = this._codeMapper[dataRow['항목코드']];
                value = dataRow[quater];

                companyMap[companyCode][itemCode] = value;
            }
        }         
        
        let documents = [];
        for(let i=0; i<companyArray.length; i++) {
            let { companyCode } = companyArray[i];
            documents[i] = {
                ...companyArray[i],
                ...companyMap[companyCode],
                category: 'quaterlyReport',
                id: companyCode,
                bizCode: bizCode,
                year: year,
                quater: quater,
                date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
        }
        return documents;
    }
}
module.exports = dartParser;