const { useMountedLayoutEffect } = require("react-table")

const mathUtil = {
    roundNumberWithDigit : function(number, digit){
        if(typeof number !== 'number'){
            try{
                number = parseFloat(number);
            }catch(e){
                console.log(`${number} can't be parsed : ${e}`);
                return 0;
            }
        }
        let divide = 1;
        for(let i=0; i<digit; i++){
            number *= 10;
            divide *= 10;
        }
        return Math.round(number) / divide;
    }
}

module.exports = mathUtil