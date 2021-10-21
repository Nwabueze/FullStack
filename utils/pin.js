const RandomNumber = require("./RandomNumberWithRange");
const PIN4digits = () => {
    let arr = '0123456789'.split('');
    const a = RandomNumber(0, 9);
    const b = RandomNumber(0, 9);
    const c = RandomNumber(0, 9);
    const d = RandomNumber(0, 9);
    
    if(a == b && a == c && a == d){
        return PIN4digits();
    }
    
    return arr[a]+""+arr[b]+""+arr[c]+""+arr[d];
}

module.exports = PIN4digits;