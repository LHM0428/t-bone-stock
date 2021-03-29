const dartParser = require('../../../common/parser/dartParser');
const fileParser = require('../../../common/parser/fileParser');

module.exports = async function dartParserTest() {
    console.log('####### START dartParserTest #########');
    
    const LG_INNOTEK_CODE = '011070';
    const LG_INNOTEK_NAME = 'LG이노텍';

    (async function getAllCompanyNameObjectOf(){
        // given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);
        const companyReports = await fileParser.getCompanyReportsOf(xlsxObject);

        
        // when
        const allCompanyNameObject = await dartParser.getAllCompanyNameObjectOf(companyReports);
        
        // then
        console.log(allCompanyNameObject.length !== null);
        console.log(allCompanyNameObject instanceof Object);
        console.log(allCompanyNameObject[LG_INNOTEK_CODE] === LG_INNOTEK_NAME);

    }());

    (async function getValueCode(){
        // given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';
        
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);
        const companyReports = await fileParser.getCompanyReportsOf(xlsxObject);
        
        // when
        const firstIndexRowData = companyReports[0];
        let valueCode = await dartParser.getValueCode(firstIndexRowData);
        
        // then
        console.log(valueCode !== null);
        console.log(valueCode === '당기 1분기 3개월');
        

    }());

    (async function getValidationObejctOf(){
        // given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';
        
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);
        const companyReports = await fileParser.getCompanyReportsOf(xlsxObject);
        
        // when
        const companiesObject = await dartParser.getValidationObejctOf(companyReports);
        
        console.log(companiesObject !== null);
        console.log(companiesObject instanceof Object);
        console.log(companiesObject[LG_INNOTEK_CODE] !== null);
        console.log(companiesObject[LG_INNOTEK_CODE] instanceof Object);
        
    }());

    (async function getElasticDocumentOf(){
        // given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';
        
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);
        const companyReports = await fileParser.getCompanyReportsOf(xlsxObject);
        const allCompanyNameObject = await dartParser.getAllCompanyNameObjectOf(companyReports);
        
        const dateObject = {
            year : '2020',
            quater : '1Q'
        }

        // when
        const elasticDocument = await dartParser.getElasticDocumentOf(companyReports, allCompanyNameObject, dateObject);

        console.log(elasticDocument);
        
    }());
    
}