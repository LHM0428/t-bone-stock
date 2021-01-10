const puppeteer = require('puppeteer');

function stockService(){
}

stockService.getAllStockPrice = async function() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.goto('https://finance.daum.net/domestic/all_stocks');
    const response = await page.waitForResponse(res => {
        if(res.url().includes('finance.daum.net/api/quotes/sectors') && res.status() === 200){
            return res;
        }
    });

    const {data} = await response.json();
    return data;
}


module.exports = stockService