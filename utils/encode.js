const {RandomNumber} = require("./utility");

const stringToInt = (s) => {
    var ar = '';
    for (var i = 0; i < s.length; i++) {
        var chr = s.charCodeAt(i) + '';
        if (chr.length == 3) {
            ar += '' + chr;
        } else if (chr.length == 2) {
            ar += '0' + chr;
        } else if (chr.length == 1) {
            ar += '00' + chr;
        }
    }
    return ar;
};

const recoverString = function (s) {
    if (!s) {
        return '';
    }
    var r = '', wrd = "abcdefghijklmnopqrstuvwxyz".split(''),
        ar = (s + '').split('');
    for (var i = 1; i <= ar.length; i++) {
        if ((i % 3) === 0) {
            str = ar[i - 3] + '' + ar[i - 2] + '' + ar[i - 1];
            if (Number(str.charAt(0)) > 0) {
                r += String.fromCharCode(Number(str));
            } else if (Number(str.charAt(0)) < 1 && Number(str.charAt(1)) > 0) {
                r += String.fromCharCode(Number(str.charAt(1) + '' + str.charAt(2)));
            } else {
                r += String.fromCharCode(Number(str.charAt(2)));
            }
        }
    }
    return r;
};

const encodeNumberStr = (str) => {
    if (str.match(/\D/) != null) {
        return false; // str should be digits string only
    }

    //Here str is expected to be a numeric string
    let string1 = "";
    let rnd;
    let ar1 = "abcdefghij".split('');
    let ar2 = "klmnopqrst".split('');
    let ar3 = "uvwxyzABCD".split('');
    let ar4 = "EFGHIJKLMN".split('');
    let ar5 = "OPQRSTUVWX".split('');
    let ar6 = "YZcdepqrCN".split('');
    let s = str.split('');

    for (let i = 0; i < (s).length; i++) {
        let rd = RandomNumber(0, 6);
        if (rd == 0) {
            rnd = ar1;
        } else if (rd == 1) {
            rnd = ar2;
        } else if (rd == 2) {
            rnd = ar3;
        } else if (rd == 3) {
            rnd = ar4;
        } else if (rd == 4) {
            rnd = ar5;
        } else if (rd == 5) {
            rnd = ar6;
        }
        let char = s[i] == "-" ? "-" : rnd[s[i]];
        string1 += char;
    }
    let string2 = "";
    let merged = ar1.concat(ar2, ar3, ar4, ar5, ar6);
    let xtra = RandomNumber(0, merged.length);
    string2 += merged[xtra];
    return `${string1}_${string2}`;

}

const decodeStringToNumbers = (str) => {
    let string1 = str.replace(/_.*/, "");
    let ar1 = "abcdefghij".split('');
    let ar2 = "klmnopqrst".split('');
    let ar3 = "uvwxyzABCD".split('');
    let ar4 = "EFGHIJKLMN".split('');
    let ar5 = "OPQRSTUVWX".split('');
    let ar6 = "YZcdepqrCN".split('');
    let merged = ar1.concat(ar2, ar3, ar4, ar5, ar6);
    let ar = string1.split('');
    let s = "";
    for (let i = 0; i < ar.length; i++) {
        if (ar[i] == "-") {
            s += "-";
            continue;
        }
        let k = merged.indexOf(ar[i]);
        let key = k > 9 ? k % 10 : k;
        s += (key);
    }
    return s;
}


/**
 * 
 * @param {string} str String to be encoded
 * @returns An encoded string
 */
const getEncodedStringValue = (str) => {
    const codeInt = stringToInt(str);
    return encodeNumberStr(codeInt);
}

/**
 * 
 * @param {string} encodedStr String previously encoded with getEncodedStringValue
 * @returns A plain text corresponding to the original string
 */
const recoverEncodedStringValue = (encodedStr) => {
    const codeInt = decodeStringToNumbers(encodedStr);
    return recoverString(codeInt);
}

module.exports = { getEncodedStringValue, recoverEncodedStringValue };