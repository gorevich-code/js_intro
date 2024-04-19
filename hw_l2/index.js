const fs = require('node:fs');

function getData(fileName){
    try {
        return Number(fs.readFileSync(fileName,'utf8'));
    }
    catch(e) {
        console.error(e);
    }
}

function calculateSum(value1, value2) {
    console.log(`Result value of ${value1} + ${value2} is ${value1+value2}`);
}

first_value = getData('a.txt');
second_value = getData('b.txt');

calculateSum(first_value, second_value);