const moment = require('moment');

const fnguidParser = {
    //"2022/12(E)" -> "2022/12"로 변환
    _getOnlyDate : (date) => date.substr(0, 7),

    //3,017,521 -> 3017521로 변환
    _getErasedCommaNumber : (numStr) => {
        return numStr.replace(/,/g, '');
    },

    parseConsensus : function(data, companyCode){
        console.log(`start parse Consensus`);
        
        const PASS = 'PASS',
        NO_VALUE = 'NO_VALUE';
        
        let bulkBody = [], consensusMap = {
            'D_2' : {},
            'D_3' : {},
            'D_4' : {},
            'D_5' : {},
            'D_6' : {},
            'D_7' : {}
        },
        arrMapper = [
            'year', 'revenue', 'revenueComparedLastYear', 'revenueComparedConsensus',
            'operatingIncomeLoss', 'operatingIncomeLossComparedLastYear', 'operatingIncomeLossComparedConsensus',
            'profit', 'profitComparedLastYear', 'profitComparedConsensus',
            PASS, PASS,
            'asset', 'liabilities', 'equity',
            PASS, PASS,
            'issuedCapital',
            'EPS', 'BPS', 'DPS', 'PER', 'PBR'
        ];

        /*
        0 : 항목
        1 : 매출액(억원)
        2 : 전년동기대비(%)
        3 : 컨센서스대비(%)
        4 : 영업이익(억원)
        5 : 전년동기대비(%)
        6 : 컨센서스대비(%)
        7 : 당기순이익(억원)
        8 : 전년동기대비(%)
        9 : 컨센서스대비(%)
        12: 자산총계(억원)
        13: 부채총계(억원)
        14: 자본총계(억원)
        17: 자본금(억원)
        18: EPS
        19: BPS
        20: DPS
        21: PER
        22: PBR
        */
        try{
            for(let i=0; i<data.length; i++){
                if(arrMapper[i] === PASS) continue;
                
                let valueName = arrMapper[i];
                for(let j=2; j<=7; j++){
                    let value = data[i][`D_${j}`] || NO_VALUE;
    
                    if(i == 0) value = this._getOnlyDate(value);
                    else value = this._getErasedCommaNumber(value);
    
                    consensusMap[`D_${j}`][valueName] = value;
                }
            }
    
            for(const [key, value] of Object.entries(consensusMap)){
                let { year, revenue, revenueComparedLastYear, revenueComparedConsensus,
                operatingIncomeLoss, operatingIncomeLossComparedLastYear, operatingIncomeLossComparedConsensus,
                profit, profitComparedLastYear, profitComparedConsensus,
                asset, liabilities, equity, issuedCapital,
                EPS, BPS, DPS, PER, PBR } = value;
    
                bulkBody.push({
                    category: 'consensus',
                    id: `${year}${companyCode}`,
                    date: moment(new Date()).format('YYYY-MM-DD'),
                    revenue, revenueComparedLastYear, revenueComparedConsensus,
                    operatingIncomeLoss, operatingIncomeLossComparedLastYear, operatingIncomeLossComparedConsensus,
                    profit, profitComparedLastYear, profitComparedConsensus,
                    asset, liabilities, equity, issuedCapital,
                    EPS, BPS, DPS, PER, PBR,
                });
            }
            console.log(`finish parse Consensus`);
            return bulkBody;
        }catch(err){
            throw(err);
        }
    }
}

module.exports = fnguidParser;