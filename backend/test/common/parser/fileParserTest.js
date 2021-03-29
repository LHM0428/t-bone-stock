const fileParser = require('../../../common/parser/fileParser');

module.exports = async function fileParserTest() {
    console.log('####### START fileParserTest #########');

    // parseXlsxFile  test
    await (async function parseXlsxFile(){
        //given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';

        //when
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);
        
        //then
        console.log(xlsxObject !== null);
        console.log(xlsxObject instanceof Object);

    }());

    // getFirstSheetObjectFromXlsxObject test
    await (async function getReportOf(){
        //given
        const filePath = 'dart/2020';
        const fileName = '2020_1분기보고서_손익계산서_PL.xlsx';
        const xlsxObject = await fileParser.parseXlsxFile(filePath, fileName);

        //when
        const companyReports = await fileParser.getCompanyReportsOf(xlsxObject);

        //then
        console.log(companyReports !== null);
        console.log(companyReports instanceof Array);
        console.log(companyReports[0] instanceof Object);

    }());
    
}