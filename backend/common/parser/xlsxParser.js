const fs = require("fs");
const iconv = require('iconv-lite');
const parse  = require("csv-parse/lib/sync");
const xlsx = require("xlsx");

const xlsxParser = {
    xlsxToObject : async function(filePath, fileName) {
        //엑셀 파싱
        // const resourcesDir = `${__dirname}/../../resources/dart/2020`;        
        // const xfile = xlsx.readFile(resourcesDir + '/2020_3분기보고서_02_손익계산서.xlsx');
        const fileFullName = `${filePath}/${fileName}`;
        const xfile = xlsx.readFile(fileFullName);
        const sheetnames = Object.keys(xfile.Sheets);
        let i = sheetnames.length;
        const resData = {};
        while (i--) {
            const sheetname = sheetnames[i];
            resData[sheetname] = xlsx.utils.sheet_to_json(xfile.Sheets[sheetname]);
        }        
        return resData;
    },
    csvToArray : async function(filePath, fileName) {
        //csv 파싱
        const fileFullName = `${filePath}/${fileName}`;
        const csv = fs.readFileSync(fileFullName);
        /*읽는 파일이 text파일인경우 대체로 euc-kr이기떄문에 디코딩 필요*/
        const utf8 = iconv.decode(csv, 'euc-kr'); 
        const records = parse(utf8.toString(), {delimiter:'\t'});
        return records;
    }    
}
module.exports = xlsxParser;