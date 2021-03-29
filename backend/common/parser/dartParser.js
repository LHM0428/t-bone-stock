const {DART_KEY, VALUE_COULUMN} = require('../constant/_dartKey'); 

const dartParser = {
    getAllCompanyNameObjectOf : async function(companyReports) {
        let companyNameObject = {};
        companyReports.forEach(rowDataObject => {
            let companyCode = this.getCompanyCodeOf(rowDataObject); 
            let companyName = rowDataObject['회사명'];
            companyNameObject[companyCode] = companyName;  
        });
        return companyNameObject;
    },
    getCompanyCodeOf : function(rowDataObject) {
        // 최초 [001040] 형태
        return rowDataObject['종목코드'].replace('[', '').replace(']','');
    },
    getElasticDocumentOf : async function(companyReports, allCompanyNameObject, {year, quater}) {

        const companyObject = await this.getValidationObejctOf(companyReports);

        let idx = 0;
        let documents = [];
        for(let companyCode in companyObject) {
            documents[idx++] = {
                companyCode,
                companyName : allCompanyNameObject[companyCode],
                ...companyObject[companyCode],
                id : `${year}_${quater}companyCode`
            }
        }
        
        return documents;
    },
    getValidationObejctOf : async function(companyReports) {
        const firstIndexRowData = companyReports[0];
        const valueCode = await this.getValueCode(firstIndexRowData);

        let companiesObject = {};
        for(let i = 0; i < companyReports.length; i++) {
            let rowDataObject = companyReports[i];
            let companyCode = this.getCompanyCodeOf(rowDataObject);
            await this.setObejctToCompanyMapifEmpty(companiesObject, companyCode);
            let itemCode =  rowDataObject['항목코드'];
            let dartCode = DART_KEY[itemCode];            
            if(dartCode) {
                let value = rowDataObject[valueCode];
                companiesObject[companyCode][itemCode] = value;
            }            
        }

        return companiesObject;
    },
    setObejctToCompanyMapifEmpty : async function(companiesObject, companyCode) {
        if(!companiesObject[companyCode]) {
            companiesObject[companyCode] = {};
        }
    },
    getValueCode : async function(companyReportsRowData) {
        let valueCode;

        for(let code in companyReportsRowData) {
            if(VALUE_COULUMN[code]) {
                valueCode = code;
                break;
            }
        }
        if(!valueCode) {
            throw new Error(`NOT FOUND VALUE_COULUMN IN '_dartKey.js'`);
        }
        return valueCode;
    },

};

module.exports = dartParser