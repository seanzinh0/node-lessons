//reguire langdetect module
const langDetect = require('langdetect')
//set text to challenge phrases
const text = "Es macht gut"
//use langdetect to check for what language the text is
const result = langDetect.detect(text);
//log the result
console.log(result, ' result');

const text2 = "Dobra prace";
const result2 = langDetect.detect(text2);
console.log(result2, ' result2');

const text3 = "Gwaith da";
const result3 = langDetect.detect(text3);
console.log(result3, ' result3');